import express from "express";
import path from "path";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from "cors";
import bodyParser from "body-parser";
import graphqlUploadExpress from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { authMiddleware } from "./utils/auth";
import chalk from 'chalk';
const db = require("./config/db");

require("dotenv").config()

interface AuthMiddleware{
    token?: String,
}

export const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const server = new ApolloServer<AuthMiddleware>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, "build")));

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(), 
        bodyParser.json(), 
        expressMiddleware(server, {
            context: async ({ req }) => authMiddleware({ req })
        }))

    await new Promise((resolve:any) => httpServer.listen({ port: PORT }, resolve));
    console.log(chalk.green(`💀 Server ready at port ${PORT} 💀`))
};
startServer();