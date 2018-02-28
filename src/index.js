import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'test token';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const globalInterceptorReq = axios.interceptors.request.use(request => {
  console.log(request);
  return request;
}, error => {
  console.error(error);
  return Promise.reject(error);
});
// axios.interceptors.request.eject(globalInterceptorReq);

export const globalInterceptorRes = axios.interceptors.response.use(res => {
  console.log(res);
  return res;
}, error => {
  console.error(error);
  return Promise.reject(error);
});
// axios.interceptors.response.eject(globalInterceptorRes);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
