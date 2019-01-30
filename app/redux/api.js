import { camelizeKeys } from 'humps';
import { schema, normalize } from 'normalizr';

const ROOT = 'http://localhost:3000/';
function callApi(url, schema) {
  const fullUrl = ROOT + url;
  return fetch(fullUrl)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return camelizedJson;
    })
    .catch(error => error);
}

export const fetchUser = login => callApi(`users/${login}`, userSchema);
export const fetchPost = id => callApi('posts');
export const fetchStarred = url => callApi(url, repoSchemaArray);
export const fetchStargazers = url => callApi(url, userSchemaArray);
