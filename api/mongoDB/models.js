import { Users } from './connectors';
import bcrypt from 'bcrypt';
import { JWTManager } from '../JWT/JWTManager';
import { pubsub } from '../pubsub';

export class UsersModel {
  async authUserByToken (authorization) {
    console.log('from getUser');
    const bearerLength = "Bearer ".length;
    if (authorization && authorization.length > bearerLength) {
      const token = authorization.slice(bearerLength);
      console.log('from getUser authToken: '+ token);
      const { state, result } = await JWTManager.verify(token);
      if (state === 'pass' || 'refresh') {
        const user = await Users.findById({ _id: result._id });
        if (user.jwtid !== result.jti) {
          return {
            state: 'fail',
            name: 'JsonWebTokenError',
            message: `jwt id invalid. expected: ${user.jwtid}`,
          };
        }
        const { _id, email, roles } = user;
        return { state, _id, email, roles };
      } else {
        return { ...result, state };
      }
    }
    return {
      state: 'fail',
      name: 'AuthenticationError',
      message: 'authorization token missing'
    };
  }
  async refreshJWT (_id, email) {
    const jwtid = JWTManager.getjwtid();
    await Users.findOneAndUpdate({ _id }, { jwtid });
    const newJWT = JWTManager.sign({ _id }, jwtid);
    // pass the newJWT to client (subscription)
    console.log('before update');
    pubsub.publish('updateJWT', { updateJWT: { newJWT, email } });
    console.log('after update');
  }
  async currentUser (authorization) {
    const user = await this.authUserByToken(authorization);
    const { state, ...result } = user;
    if (state === 'pass' || 'refresh') {
      return { result, jwt:'Not valid, may out of date.' };
    } else {
      return null;
    }
  }
  async login (email, password) {
    const jwtid = JWTManager.getjwtid();
    const user = await Users.findOneAndUpdate({ email }, { jwtid });
    if (!user) {
      throw new Error('Email not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Password is incorrect');
    }
    // Generate the jwt and add it to the user document being returned.
    user.jwt = JWTManager.sign({ _id: user._id }, jwtid);
    return user;
  }
  async signup (email, password) {
    console.log('from signup')
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error('Email already used');
    }
    const hash = await bcrypt.hash(password, 10);
    const jwtid = JWTManager.getjwtid();
    await Users.create({
      email,
      password: hash,
      roles: ['USER', 'ADMIN'],
      jwtid
    });
    const user = await Users.findOne({ email });
    user.jwt = JWTManager.sign({ _id: user._id }, user.jwtid);
    return user;
  }
}
