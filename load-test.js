import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100, // Virtual Users
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
