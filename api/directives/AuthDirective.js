import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { Users } from '../mongoDB/connectors';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    type._requiredAuthRole = this.args.requires;
    this.ensureFieldsWrapped(type);
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    field._requiredAuthRole = this.args.requires;
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    console.log('from AuthDirective');
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    // ! The fields will not be wrapped if they are added to the schema after AuthDirective is applied !
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;
        console.log(requiredRole);
        if (! requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const user = await getUser(context.authToken);
        if (user && user.roles && user.roles.includes(requiredRole)) {
          return resolve.apply(this, args);
        }

        throw new Error("not authorized");
      };
    });
  }
}

const getUser = async (authorization) => {
  console.log('from auth');
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    console.log(token);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, JWT_SECRET, (err, result) => {
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
