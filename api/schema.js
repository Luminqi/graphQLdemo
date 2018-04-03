import { mergeSchemas } from 'graphql-tools';
import dota2Schema from './dota2/schema';
import mongoSchema from './mongoDB/schema';

const schema = mergeSchemas({
  schemas: [dota2Schema, mongoSchema]
});

export default schema;