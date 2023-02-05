import { User } from "../models"

export const resolvers = {
    Query: {
        users: async() => {
            return User.find()
            .select("-__v -password");
        }
    }
}