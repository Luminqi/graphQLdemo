import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";

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
        console.log('requiredRole'+ requiredRole);
        if (! requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const user = await context.Users.authUserByToken(context.authToken);
        const { state } = user;
        console.log('after getUser: '+ state);
        if (state === 'pass' && user.roles && user.roles.includes(requiredRole)) {
          return resolve.apply(this, args);
        }
        if (state === 'refresh') {
          const { _id, email } = user;
          context.Users.refreshJWT(_id, email);
          return resolve.apply(this, args);
        }
        // need more accurate error
        const error = user.state === 'fail' ? `${user.name},${user.message}` : 'not authorized';
        throw new Error(error);
      };
    });
  }
}
