# Node.js Backend Application with Docker

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Docker](https://img.shields.io/badge/Docker-20.x-blue)

This project demonstrates a simple Node.js backend application with Docker containerization, featuring:
- Visitor counter endpoint
- Login page with trial user support
- Load testing with k6
- Dockerized deployment

## Prerequisites

- Node.js 16+
- Docker 20+
- Docker Compose 2.2+

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nodejs-backend-app.git
cd nodejs-backend-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Setup

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Run with Docker

Build and start the container:

```bash
docker compose up --detach --build
```

## Project Structure

```
nodejs-backend-app/
├── public/               # Static files
│   └── login.html        # Login page
├── dist/                 # Production build (generated)
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker compose configuration
├── load-test.js          # k6 load test script
├── package.json          # Project dependencies
├── server.js             # Main application file
└── webpack.config.js     # Webpack configuration
```

## Features

### 1. Visitor Counter

Access the root endpoint to see visitor count:

```bash
curl http://localhost:3000
```
Example response:
```
container ID: Total number of visit is: 1
```

### 2. Login System

Access the login page at `http://localhost:3000/login`

Pre-configured users:
- Regular user: `admin` / `admin123`
- Trial user: `trial` / `trial123`

### 3. Signup Redirection

The signup page redirects to Google account creation:
`http://localhost:3000/signup`

### 4. Load Testing

Run load test with 100 virtual users:

```bash
npm test
```

Or directly with k6:

```bash
k6 run load-test.js
```

## Deployment

### Docker Deployment

1. Build the Docker image:

```bash
docker-compose build
```

2. Start the container:

```bash
docker-compose up -d
```

3. Verify it's running:

```bash
docker ps
```

### Manual Deployment

1. Build the application:

```bash
npm run build
```

2. Start the server:

```bash
node dist/bundle.js
```

## Testing

### Unit Tests

To be implemented

### Load Tests

The included k6 script tests the main endpoint with 100 virtual users:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response contains container name': (r) => r.body.includes('Total number of visit is:'),
  });
  sleep(1);
}
```

## Troubleshooting

### Build Errors

If you encounter webpack build errors:
1. Ensure all dependencies are installed:

```bash
npm install
```

2. Check for missing loaders:

```bash
npm install html-loader --save-dev
```

### Docker Issues

If containers fail to start:
1. Check logs:

```bash
docker-compose logs
```

2. Rebuild from scratch:

```bash
docker-compose down
docker-compose up --build
```

## License

MIT License

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

**Note**: This is a basic implementation. For production use, consider adding:
- Proper database integration
- Environment variables for configuration
- HTTPS support
- More robust authentication
