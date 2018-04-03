import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';
import { JWT_SECRET } from './config';
import { Users } from './mongoDB/connectors';

// Heroku 会动态分配端口（通过环境变量 PORT 指定）
const GRAPHQL_PORT = process.env.PORT || 3000;
const ENGINE_API_KEY = 'service:luminqi:t-YMuoOMxrj2It0G8ciJCw';

const getUser = async (authorization) => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, secrets.JWT_SECRET, (err, result) => {
        if (err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result
          });
        }
      })
    );
    
    if (ok) {
      const user = await Users.findById({ _id: result._id });
      return user;
    } else {
      console.error(result);
      return null;
    }
  }

  return null;
};

const graphQLServer = express();

graphQLServer.use(compression());
graphQLServer.use('/graphql',
  bodyParser.json(),
  graphqlExpress(async (req) => {
    const user = await getUser(req.headers.authorization);
    return {
      schema,
      tracing: true,
      cacheControl: true,
      context: {
        user
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
});
engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});




