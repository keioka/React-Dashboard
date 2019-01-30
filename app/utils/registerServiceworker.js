import { SERVICE_WORKER_FILENAME } from '../../config';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`/${SERVICE_WORKER_FILENAME}`)
    .then(() => {
      console.log('Service worker registered!');
    })
    .catch((error) => {
      console.log('Error registering service worker: ', error);
    });
} else {
  console.log('Not supported by browser');
}
