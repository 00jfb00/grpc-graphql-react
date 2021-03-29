import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  __dirname + "/Post.proto"
);

const proto: any = grpc.loadPackageDefinition(packageDefinition);

class PostClient {
  static getInsecureClient(host: string) {
    return new proto.sample.PostService(
      host,
      grpc.credentials.createInsecure()
    );
  }

  static getSecureClient(host: string, apiKey?: string) {
    let credentials = grpc.credentials.createInsecure();

    if (!apiKey) {
      return new proto.sample.PostService(host, credentials);
    }

    const interceptorAuth: any = (options: any, nextCall: any) =>
      new grpc.InterceptingCall(nextCall(options), {
        start: function (metadata, listener, next) {
          metadata.add("x-api-key", apiKey);
          next(metadata, listener);
        },
      });

    const options: any = {
      "grpc.ssl_target_name_override": "localhost",
      interceptors: [interceptorAuth],
    };

    return new proto.sample.PostService(host, credentials, options);
  }
}

export default PostClient;
