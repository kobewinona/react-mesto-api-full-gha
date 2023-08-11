import {authConfig} from './props';


// set request and response

const setRequest = (url, config) => {
  return fetch(url, config);
}

const returnRes = res => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};


// set requests by method

export const register = ({email, password}) => {
  return setRequest(`${authConfig['url']}/signup`, {
    method: 'POST',
    headers: authConfig['headers'],
    body: JSON.stringify({email, password})
  }).then(res => returnRes(res))
};

export const authorize = ({email, password}) => {
  return setRequest(`${authConfig['url']}/signin`, {
    method: 'POST',
    headers: authConfig['headers'],
    body: JSON.stringify({email, password})
  }).then(res => returnRes(res));
};

export const getContent = token => {
  return setRequest(`${authConfig['url']}/users/me`, {
    method: 'GET',
    headers: {...authConfig['headers'], 'Authorization': `Bearer ${token}`}
  }).then(res => returnRes(res));
};