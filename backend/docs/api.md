# Job Portal API

Base URL: `http://localhost:5000/api`

## Auth

### Register

- `POST /auth/register`
- Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "applicant"
}
```

### Login

- `POST /auth/login`

### Current user

- `GET /auth/me`
- Requires `Authorization: Bearer <token>`

## Users

### Current user profile

- `GET /users/me`
- Requires `Authorization: Bearer <token>`

## Jobs

### List jobs

- `GET /jobs`

### Job by id

- `GET /jobs/:id`

### Recruiter posted jobs

- `GET /jobs/mine`
- Recruiter only

### Create job

- `POST /jobs`
- Recruiter only
- Body:

```json
{
  "title": "Frontend Developer",
  "company": "Acme Inc",
  "location": "Remote",
  "description": "Build and ship UI features"
}
```

## Applications

### Apply to job

- `POST /applications/:jobId`
- Applicant only

### Applicant applications

- `GET /applications/mine`
- Applicant only

### Recruiter applications

- `GET /applications/recruiter`
- Recruiter only
