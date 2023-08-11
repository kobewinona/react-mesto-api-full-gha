import {apiConfig} from './props';


// set default request and response

const setRequest = (url, config) => {
  return fetch(url, config);
}

const returnRes = res => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
};


// set user info request

export const getUserInfo = () => {
  return setRequest(`${apiConfig['url']}/users/me`, {
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
}

export const patchUserAvatar = ({avatar}) => {
  return setRequest(`${apiConfig['url']}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig['headers'],
    body: JSON.stringify({avatar})
  }).then(res => returnRes(res));
}

export const patchUserInfo = ({name, about}) => {
  return setRequest(`${apiConfig['url']}/users/me`, {
    method: 'PATCH',
    headers: apiConfig['headers'],
    body: JSON.stringify({name, about})
  }).then(res => returnRes(res));
}


// set cards request

export const  getInitialCards = () => {
  return setRequest(`${apiConfig['url']}/cards`, {
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
}

export const postCard = ({name, link}) => {
  return setRequest(`${apiConfig['url']}/cards`, {
    method: 'POST',
    headers: apiConfig['headers'],
    body: JSON.stringify({name, link})
  }).then(res => returnRes(res));
}

export const deleteCard = (cardID) => {
  return setRequest(`${apiConfig['url']}/cards/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
}

export const changeLikeCardStatus = (cardID, isLiked) => {
  if (!isLiked) {
    return setRequest(`${apiConfig['url']}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: apiConfig['headers']
    }).then(res => returnRes(res));
  } else {
    return setRequest(`${apiConfig['url']}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: apiConfig['headers']
    }).then(res => returnRes(res));
  }
}