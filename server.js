import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
// import { Engine } from 'apollo-engine';
import { ApolloEngine } from 'apollo-engine';

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = 'service:luminqi:t-YMuoOMxrj2It0G8ciJCw';

const graphQLServer = express();

graphQLServer.use(compression());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  tracing: true,
  cacheControl: true
}));
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
});
engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});




