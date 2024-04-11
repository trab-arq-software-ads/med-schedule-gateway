const { Router } = require("express");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");
const appointments = require("../clients/appointments");

const router = Router();

router.get("/appointments", function (req, res) {
  appointments.service.List(null, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.get("/appointments/:id/", function (req, res) {
  const patiant_id = req.params.id;

  appointments.service.List(null, function (err, data) {
    data.results = data.results.filter((item) => item.patient_id == patiant_id);
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.post("/appointments", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Patient object is empty" });
    return;
  }

  appointments.service.Create(req.body, function (err, response) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(201).json(response);
    }
  });
});

router.put("/appointments/:id", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Patient object is empty" });
    return;
  }

  const appointmentId = req.params.id;
  const updatedData = req.body;

  appointments.service.Update(
    { id: appointmentId, ...updatedData },
    function (err, response) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.status(200).json(response);
      }
    }
  );
});

router.delete("/appointments/:id", function (req, res) {
  const appointmentId = req.params.id;

  appointments.service.Destroy({ id: appointmentId }, function (err, response) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(204).end();
    }
  });
});

module.exports = router;
