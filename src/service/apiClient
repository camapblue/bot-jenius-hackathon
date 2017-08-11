import axios from 'axios'

const baseUrl = 'http://microservice-jenius-bot.microservice-jenius-bot.f7123b89.svc.dockerapp.io:3000/actions/';

const getUrl = action => baseUrl + action;

const callApi = (method = 'get', action, param, data) => {
  let finalUrl = null;
  if (param) {
    finalUrl = getUrl(action)
  } else {
    finalUrl = getUrl(action + '?' + param);
  }

  return axios({
    method,
    url: finalUrl,
    data
  }).then(response => response.data);
};

const getCurrentBalance = (accountNumber) => {
  return callApi('post', 'show-balance', null, {
    accountNumber: accountNumber
  });
};

export default {
  getCurrentBalance
}