import { withFilter } from 'graphql-subscriptions';
import { pubsub }  from '../pubsub';

const resolvers = {
  Query: {
    currentUser(root, args, context) {
      return context.Users.currentUser(context.authToken);
    }
  },
  Mutation: {
    login (root, { email, password }, context) {
      return context.Users.login(email, password);
    },
    signup (root, { email, password }, context) {
      return context.Users.signup(email, password);
    }
  },
  Subscription: {
    updateJWT: {
      // run before graphql execution, the payload is which published by pubsub
      // resolve: (payload, args, context, info) => {
      //   // Manipulate and return the new value
      //   console.log('from resolve: ')
      //   console.log(payload);
      //   return { ...payload };
      // },
      // filter the update event with the email
      subscribe: withFilter(
        () => pubsub.asyncIterator('updateJWT'),
        (payload, variables) => {
          console.log('from filter' + payload.updateJWT.email + '===' + variables.email);
          return payload.updateJWT.email === variables.email;
        } 
      )
    }
  }
};

export default resolvers;