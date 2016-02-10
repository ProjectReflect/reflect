import 'isomorphic-fetch';
import { fromJS } from 'immutable';
import bluebird from 'bluebird';

// in index.js this is redirected to the backend
const API_URL = '/api';
const defaultContent = fromJS({
  method: 'GET',
});

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// default empty content if content is null
const fetcher = (url, _content = fromJS({})) => {
  const content = _content.toJS();
  return bluebird.resolve(fetch(url, content))
          .then(checkStatus)
          .then(parseJSON);
}

export function get(endpoint) {
  const url = `${API_URL}${endpoint}`;
  const content = defaultContent.set('method', 'GET');
  return fetcher(url);
}

function parseJSON(response) {
  try {
    return response.json();
  } catch (e) {
    console.error('Fetch response in non-json form');
    console.error(e);
  }
}
