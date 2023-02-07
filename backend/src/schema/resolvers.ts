import { GraphQLError } from 'graphql';
import { User } from "../models"
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        users: async() => {
            return User.find()
            .select("-__v -password");
        }
    },
    Mutation: {
        adduser: async (_parent :any, args: any) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (_parent: any, { email, password } : { email: string, password: string }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new GraphQLError("Username or password incorrect.", {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    }
                });
            };
            const isPasswordCorrect = await user.isCorrectPassword(password);
            if (!isPasswordCorrect) {
                throw new GraphQLError("Username or password incorrect.", {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    }
                });
            };
            const token = signToken(user);
            return { token, user };
        },
    }
}