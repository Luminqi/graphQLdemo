import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import uuidv4 from "uuid/v4";

export const JWTManager = {
  isExpired (exp, time = 0) {
    return Math.floor(Date.now() / 1000 ) - exp >= time;
  },
  getjwtid () {
    return uuidv4();
  },
  sign (payload, jwtid) {
    console.log(jwtid);
    return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: 60, jwtid });
  },
  verify (token) {
    console.log('from verify, secret: ' + JWT_SECRET);
    return new Promise(resolve =>
      // igonre the expiration to get the user payload, and manually check the expiration later.
      jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'], ignoreExpiration: true }, (err, result) => {
        if (err) {
          resolve({
            state: 'fail',
            result: err
          });
        } else {
          console.log('from verify initial pass');
          console.log(result);
          if (JWTManager.isExpired(result.exp)) {
            if (JWTManager.isExpired(result.exp, 3600)) {
              resolve({
                state: 'fail',
                result: {
                  name: 'TotallyExpiredError',
                  message: 'jwt expired for 1h',
                }
              })
            } else {
              resolve({
                state: 'refresh',
                result
              });
            }
          } else {
            // should check the jwt id later
            resolve({
              state: 'pass',
              result
            });
          }
        }
      })
    );
  }
}