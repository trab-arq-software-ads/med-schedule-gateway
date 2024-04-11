const path = require("path");
const { createClient } = require("./grpcClient");

const doctors = createClient(
  path.resolve(__dirname, "../../proto/Doctors.proto"),
  "DoctorService",
  "localhost:50051"
);

module.exports = doctors;
