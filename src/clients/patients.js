const path = require("path");
const { createClient } = require("./grpcClientExpress");

const patientsClient = createClient(
  path.resolve(__dirname, "../../proto/Patients.proto"),
  "PatientService",
  "localhost:50052"
);

module.exports = patientsClient;
