const { Router } = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../../proto/Doctors.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const doctorsProto = grpc.loadPackageDefinition(packageDefinition);

const { DoctorService } = doctorsProto;

const router = Router();

function createClient() {
  return new DoctorService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
}

router.get("/doctors", function (req, res) {
  const client = createClient();

  client.ListDoctors({}, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    } else {
      res.json(data.doctors);
    }
  });
});

router.get("/doctors/:doctorId", function (req, res) {
  const client = createClient();

  client.GetDoctor({ id: req.params.doctorId }, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to fetch doctor" });
    } else {
      res.json(data.doctor);
    }
  });
});

router.post("/doctors", function (req, res) {
  const client = createClient();

  client.CreateDoctor(req.body, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to create doctor" });
    } else {
      res.json(data.doctor);
    }
  });
});

router.put("/doctors/:doctorId", function (req, res) {
  const client = createClient();

  client.UpdateDoctor(
    { id: req.params.doctorId, ...req.body },
    function (err, data) {
      if (err) {
        res.status(500).json({ error: "Failed to update doctor" });
      } else {
        res.json(data.doctor);
      }
    }
  );
});

router.delete("/doctors/:doctorId", function (req, res) {
  const client = createClient();

  client.DeleteDoctor({ id: req.params.doctorId }, function (err, data) {
    if (err) {
      res.status(500).json({ error: "Failed to delete doctor" });
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
