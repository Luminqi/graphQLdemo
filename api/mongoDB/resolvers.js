import { Users } from './connectors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const resolvers = {
  Query: {
    currentUser(root, args, context) {
      return context.user;
    }
  },
  Mutation: {
    login: async (root, { email, password }) => {
       const user = await Users.findOne({ email });
       if (!user) {
         throw new Error('Email not found');
       }
       const validPassword = await bcrypt.compare(password, user.password);
       if (!validPassword) {
        throw new Error('Password is incorrect');
       }
       // Generate the jwt and add it to the user document being returned.
       user.jwt = jwt.sign({ _id: user._id }, JWT_SECRET);
       return user;
    },
    signup: async (root, { email, password }) => {
      console.log('from signup')
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new Error('Email already used');
      }
      const hash = await bcrypt.hash(password, 10);
      await Users.create({
        email,
        password: hash,
        roles: ['USER', 'ADMIN']
      });
      const user = await Users.findOne({ email });
      user.jwt = jwt.sign({ _id: user._id }, JWT_SECRET);
      return user;
    }
  }
};

export default resolvers;