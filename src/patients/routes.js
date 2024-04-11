const { Router } = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../../proto/Patients.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const patientsProto = grpc.loadPackageDefinition(packageDefinition);

const { PatientService } = patientsProto;

const router = Router();

function createClient() {
  return new PatientService(
    "localhost:50052",
    grpc.credentials.createInsecure()
  );
}

router.get("/patients", function (req, res) {
  const client = createClient();

  client.ListPatients({}, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to fetch patients" });
    } else {
      res.json(data.patients);
    }
  });
});

router.get("/patients/:patientId", function (req, res) {
  const client = createClient();

  client.GetPatient({ id: req.params.patientId }, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to fetch patient" });
    } else {
      res.json(data);
    }
  });
});

router.post("/patients", function (req, res) {
  const client = createClient();

  client.CreatePatient(req.body, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to create patient" });
    } else {
      res.json(data.patient);
    }
  });
});

router.put("/patients/:patientId", function (req, res) {
  const client = createClient();

  client.UpdatePatient(
    { id: req.params.patientId, ...req.body },
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update patient" });
      } else {
        res.json(data.patient);
      }
    }
  );
});

router.delete("/patients/:patientId", function (req, res) {
  const client = createClient();

  client.DeletePatient({ id: req.params.patientId }, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to delete patient" });
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
