const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

function loadProto(protoPath, serviceName) {
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const proto = grpc.loadPackageDefinition(packageDefinition);
  return proto[serviceName];
}

function createClient(protoPath, serviceName, host) {
  const Service = loadProto(protoPath, serviceName);
  return new Service(host, grpc.credentials.createInsecure());
}

module.exports = { createClient };
