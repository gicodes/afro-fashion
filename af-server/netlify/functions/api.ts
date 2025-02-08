import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";

const api = express();
const router = Router();

api.use(
  cors({
    origin: "https://afrofashion.site", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

api.use("/api/", router);

export const handler = serverless(api);