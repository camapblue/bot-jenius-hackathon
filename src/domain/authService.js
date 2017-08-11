import api from '../service/apiClient';

class AuthService {
  _getUser(username) {
    return api.getUser(username).then(data => data);
  }

  runCommand(command) {
    const { username } = command;
    return this._getUser(username);
  }
}

export default AuthService;