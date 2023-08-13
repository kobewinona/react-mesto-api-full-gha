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

export const register = ({email, password}) => {
  return setRequest(`${apiConfig['url']}/signup`, {
    method: 'POST',
    headers: apiConfig['headers'],
    body: JSON.stringify({email, password})
  }).then(res => returnRes(res))
};

export const authorize = ({email, password}) => {
  return setRequest(`${apiConfig['url']}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig['headers'],
    body: JSON.stringify({email, password})
  }).then(res => returnRes(res));
};

export const logout = () => {
  return setRequest(`${apiConfig['url']}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
};


// set user info request

export const getUserInfo = () => {
  return setRequest(`${apiConfig['url']}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {...apiConfig['headers']}
  }).then(res => returnRes(res));
};

export const patchUserAvatar = ({avatar}) => {
  return setRequest(`${apiConfig['url']}/users/me/avatar`, {
    method: 'PATCH',
    credentials: 'include',
    headers: apiConfig['headers'],
    body: JSON.stringify({avatar})
  }).then(res => returnRes(res));
}

export const patchUserInfo = ({name, about}) => {
  return setRequest(`${apiConfig['url']}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: apiConfig['headers'],
    body: JSON.stringify({name, about})
  }).then(res => returnRes(res));
}


// set cards request

export const  getInitialCards = () => {
  return setRequest(`${apiConfig['url']}/cards`, {
    credentials: 'include',
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
}

export const postCard = ({name, link}) => {
  return setRequest(`${apiConfig['url']}/cards`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig['headers'],
    body: JSON.stringify({name, link})
  }).then(res => returnRes(res));
}

export const deleteCard = (cardID) => {
  return setRequest(`${apiConfig['url']}/cards/${cardID}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: apiConfig['headers']
  }).then(res => returnRes(res));
}

export const changeLikeCardStatus = (cardID, isLiked) => {
  if (!isLiked) {
    return setRequest(`${apiConfig['url']}/cards/${cardID}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: apiConfig['headers']
    }).then(res => returnRes(res));
  } else {
    return setRequest(`${apiConfig['url']}/cards/${cardID}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: apiConfig['headers']
    }).then(res => returnRes(res));
  }
}