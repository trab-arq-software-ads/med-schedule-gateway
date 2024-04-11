const path = require("path");
const { createClient } = require("./grpcClientExpress");

const doctorsClient = createClient(
  path.resolve(__dirname, "../../proto/Doctors.proto"),
  "DoctorService",
  "localhost:50051"
);

module.exports = doctorsClient;
