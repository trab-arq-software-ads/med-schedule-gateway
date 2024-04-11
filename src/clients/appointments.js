const path = require("path");
const Client = require("./grpcClientDRF");

const appointmentsClient = new Client(
  path.resolve(__dirname, "../../proto/Appointments.proto"),
  "settings.appointments.AppointmentController",
  "127.0.0.1:50053",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    arrays: false,
    objects: false,
    oneofs: false,
  }
);

module.exports = appointmentsClient;
