/* eslint-env jest */
import App from "./App";
import Client from "./clients/Post/PostClient";
import mongoose from "mongoose";

const API_KEY = "myapikey";

const PORT: number = 50052;
let app: App;
let secureClient: any;

describe("Sample gRPC Post API", () => {
  beforeAll(async () => {
    app = new App("mongodb://localhost:27017/sample-grpc-test", PORT);
    await app.start();
    secureClient = Client.getSecureClient(`localhost:${PORT}`, API_KEY);
  });
  afterAll(async () => {
    const mongo = await mongoose.connect(
      "mongodb://localhost:27017/sample-grpc-test"
    );
    await mongo.connection.db.dropDatabase();
    await app.stop();
  });

  describe("App", () => {
    test("Insecure call should fail", (done) => {
      let insecureClient = Client.getInsecureClient(`localhost:${PORT}`);
      insecureClient.addPost(
        { title: "sample title", body: "sample body" },
        function (err: any, response: any) {
          expect(err.toString()).toBe("Error: 2 UNKNOWN: invalid.apiKey");
          expect(response).toBe(undefined);
          done();
        }
      );
    });

    test("Secure call should be OK", (done) => {
      const sample = { title: "sample", body: "sample body" };
      secureClient.addPost(sample, function (err: any, response: any) {
        expect(err).toBe(null);
        delete response._id;
        expect(response.toString()).toBe(sample.toString());
        done();
      });
    });
  });
});
