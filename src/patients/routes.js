const { Router } = require("express");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");
const patientsClient = require("../clients/patients");

const router = Router();

router.get("/patients", function (req, res) {
  patientsClient.ListPatients({}, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.patients);
    }
  });
});

router.get("/patients/:patientId", function (req, res) {
  patientsClient.GetPatient({ id: req.params.patientId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.post("/patients", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Patient object is empty" });
    return;
  }

  patientsClient.CreatePatient(req.body, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.patient);
    }
  });
});

router.put("/patients/:patientId", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Patient object is empty" });
    return;
  }

  patientsClient.UpdatePatient(
    { id: req.params.patientId, ...req.body },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data.patient);
      }
    }
  );
});

router.delete("/patients/:patientId", function (req, res) {
  patientsClient.DeletePatient(
    { id: req.params.patientId },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

module.exports = router;
