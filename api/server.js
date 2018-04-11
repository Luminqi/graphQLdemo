import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
import { Dota2Connector } from './dota2/connectors';
import { Heroes } from './dota2/models';
// Heroku 会动态分配端口（通过环境变量 PORT 指定）
const GRAPHQL_PORT = process.env.PORT || 3001;
const ENGINE_API_KEY = 'service:luminqi:t-YMuoOMxrj2It0G8ciJCw';

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
      tracing: true,
      cacheControl: true,
      context: {
        authToken,
        Heroes: new Heroes({ connector: new Dota2Connector })
      }
    };
  })
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// const engine = new Engine({
//   engineConfig: {
//     apiKey: ENGINE_API_KEY,
//   },
//   graphqlPort: GRAPHQL_PORT
// });
// engine.start();
const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
  frontends: [{
    overrideGraphqlResponseHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }]
});
engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});




