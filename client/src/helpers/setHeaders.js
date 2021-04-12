import store from '@/store';

export default function (config = { json: false }) {
  const headers = new Headers();

  if (config.json) {
    headers.append('Content-Type', 'application/json');
  }
  headers.append('Authorization', `Bearer ${store.getters.token}`);

  return headers
}