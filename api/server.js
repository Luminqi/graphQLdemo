import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
import { Dota2Connector } from './dota2/connectors';
import { Heroes, Players, ProData, Match } from './dota2/models';
import { UsersModel as Users } from './mongoDB/models';
import { ENGINE_API_KEY } from './config'
// Subscription
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { resolve } from 'url';
// graphql depth limit (not work for apollo-server-express)
// import { depthLimit } from 'graphql-depth-limit';
// Heroku 会动态分配端口（通过环境变量 PORT 指定）
const GRAPHQL_PORT = process.env.PORT || 3001;
const wsGqlURL = process.env.NODE_ENV !== 'production'
  ? `ws://localhost:${GRAPHQL_PORT}/subscriptions`
  : `ws://apollo-luminqi.herokuapp.com/subscriptions`;

const graphQLServer = express();
// enable CORS
graphQLServer.use(cors());
graphQLServer.use(compression());
graphQLServer.use('/graphql',
  bodyParser.json(),
  graphqlExpress((req) => {
    const authToken = req.headers.authorization;
    return {
      schema,
      // validationRules: [ depthLimit(10) ],
      tracing: true,
      cacheControl: true,
      context: {
        authToken,
        Users: new Users(),
        Heroes: new Heroes({ connector: new Dota2Connector }),
        Players: new Players({ connector: new Dota2Connector }),
        ProData: new ProData({ connector: new Dota2Connector }),
        Match: new Match({ connector: new Dota2Connector })
      }
    };
  })
);
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: wsGqlURL
}));

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
  frontends: [{
    overrideGraphqlResponseHeaders: {
      'Access-Control-Allow-Origin': '*', // see CDN docs
    },
  }]
});
engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
  graphqlPaths: ['/graphql', '/subscriptions'],
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
  console.log(`API Server over web socket with subscriptions is now running on ws://localhost:${GRAPHQL_PORT}/subscriptions`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
      /* onConnect: (connectionParams, webSocket, context) => {
        // 初次接入时验证身份
      }, */
      // the onOperation function is called for every new operation
      // and we use it to set the GraphQL context for this operation
      // onOperation: (msg, params, socket) => {
      //   console.log(msg);
      //   console.log(params);
      //   return new Promise(resolve => {
      //     resolve({
      //       // authToken: socket.upgradeReq.headers.authorization,
      //       Users: new Users(),
      //       Heroes: new Heroes({ connector: new Dota2Connector })
      //     })
      //   })
      // }
    }, 
    {
      path: '/subscriptions',
      server:  engine.httpServer
    }
  )
});




