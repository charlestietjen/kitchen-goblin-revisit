import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';
import { User, Recipe, IRecipe } from "../models"
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select("-__v -password");
        },
        user: async( _parent: any, { _id }: { _id: Types.ObjectId }) => {
            return User.findById( _id )
        },
        recipes: async (_parent: any, { author_id }: { author_id: Types.ObjectId }) => {
            if (author_id) {
                return Recipe.find((data: IRecipe) => {
                    data.author === author_id
                })
                    .select("-__v")
            }
            return Recipe.find()
        },
        recipe: async (_parent: any, { _id }: { _id: string }) => {
            return Recipe.findById(_id)
                .select("-__v")
        }
    },
    Mutation: {
        adduser: async (_parent: any, args: any) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (_parent: any, { email, password }: { email: string, password: string }) => {
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
        addrecipe: async (_parent: any, args: any) => {
            const recipe = await Recipe.create(args);
            return recipe;
        }
    }
}