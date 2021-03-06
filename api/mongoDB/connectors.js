import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://luminqi:Luminqi670903@ds229438.mlab.com:29438/grapgql');

// models
const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  roles: [String],
  jwtid: String
});
const Users = Mongoose.model('Users', UserSchema);

export { Users };