const { Router } = require("express");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");
const doctorsClient = require("../clients/doctors");

const router = Router();

router.get("/doctors", function (req, res) {
  doctorsClient.ListDoctors({}, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.doctors);
    }
  });
});

router.get("/doctors/:doctorId", function (req, res) {
  doctorsClient.GetDoctor({ id: req.params.doctorId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.doctor);
    }
  });
});

router.post("/doctors", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Doctor object is empty" });
    return;
  }

  doctorsClient.CreateDoctor(req.body, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.doctor);
    }
  });
});

router.put("/doctors/:doctorId", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Doctor object is empty" });
    return;
  }

  doctorsClient.UpdateDoctor(
    { id: req.params.doctorId, ...req.body },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data.doctor);
      }
    }
  );
});

router.delete("/doctors/:doctorId", function (req, res) {
  doctorsClient.DeleteDoctor({ id: req.params.doctorId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
