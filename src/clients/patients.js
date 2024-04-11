const path = require("path");
const { createClient } = require("./grpcClient");

const patients = createClient(
  path.resolve(__dirname, "../../proto/Patients.proto"),
  "PatientService",
  "localhost:50052"
);

module.exports = patients;
