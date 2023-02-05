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
const db = require("./config/db");

require("dotenv").config()

export const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, "build")));

    app.use(cors(), bodyParser.json(), expressMiddleware(server),)

    await new Promise((resolve:any) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server ready at ${PORT}?`)
};
startServer();