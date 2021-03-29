/// <reference path="mali.d.ts" />

import mongoose from "mongoose";
import Mali from "mali";

import PostService from "./services/Post";

function auth(apiKey: string) {
  return async function (ctx: any, next: any) {
    const apiKeyProvided: string = ctx.request.get("x-api-key");

    if (!apiKeyProvided || apiKeyProvided !== apiKey) {
      throw new Error("invalid.apiKey");
    }
    await next();
  };
}

class App {
  server: any;
  databaseUrl: string;
  port: number;

  public constructor(databaseUrl: string, port: number) {
    this.databaseUrl = databaseUrl;
    this.port = port;
  }

  public async start(this: App) {
    await mongoose.connect(this.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.server = new Mali();
    this.server.on("error", (err: any, ctx: any) => {
      console.error("server error for call %s of type %s", ctx.name, ctx.type);
    });
    this.server.addService(
      `./src/clients/${PostService.protoPath}`,
      "PostService"
    );
    this.server.use("PostService", auth("myapikey"));
    this.server.use(PostService.implementation);

    this.server.start(`0.0.0.0:${this.port}`);

    console.info("server started");
  }

  public async stop() {
    this.server.stop();
  }
}

export default App;
