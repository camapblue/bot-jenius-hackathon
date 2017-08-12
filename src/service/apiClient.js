import axios from 'axios'

const baseUrl = 'http://microservice-jenius-bot.microservice-jenius-bot.f7123b89.svc.dockerapp.io:3000/';

const getUrl = action => baseUrl + action;

const callApi = (method = 'get', action, param, data) => {
  const url = param ? getUrl(action + '?' + param): getUrl(action);
  return axios({ method, url, data })
    .then(response => response.data);
};

const getCurrentBalance = accountNumber => callApi('post', 'show-balance', null, { accountNumber });
const getUser = username => callApi('get', 'users/'+ username);
const transferAmount = (ownerAccountNumber, partnerAccountNumber, amount) => callApi('post', 'actions/transfer-money', null, { ownerAccountNumber, partnerAccountNumber, amount });
const findUser = text => callApi('get', 'users', 'firstName=' + text);

export default {
  getCurrentBalance,
  getUser,
  transferAmount,
  findUser
}