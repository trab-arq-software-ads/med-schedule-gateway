# API Gateway for MedSchedule gRPC Services

This API gateway is designed to provide RESTful endpoints for interacting with gRPC services. It uses Node.js with Express.js as the web server framework.

## Installation

To run the API gateway, follow these steps:

1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Routes

### Doctors

- **GET /doctors**: Get a list of all doctors.
- **GET /doctors/:doctorId**: Get details of a specific doctor.
- **POST /doctors**: Create a new doctor.
- **PUT /doctors/:doctorId**: Update details of a specific doctor.
- **DELETE /doctors/:doctorId**: Delete a specific doctor.

### Patients

- **GET /patients**: Get a list of all patients.
- **GET /patients/:patientId**: Get details of a specific patient.
- **POST /patients**: Create a new patient.
- **PUT /patients/:patientId**: Update details of a specific patient.
- **DELETE /patients/:patientId**: Delete a specific patient.

### Appointments

- **GET /appointments**: Get a list of all appointments.
- **GET /appointments/:id**: Get appointments for a specific patient.
- **POST /appointments**: Create a new appointment.
- **PUT /appointments/:id**: Update details of a specific appointment.
- **DELETE /appointments/:id**: Delete a specific appointment.



