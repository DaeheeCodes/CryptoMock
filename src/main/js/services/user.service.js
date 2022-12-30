import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api//';

class UserService {
  updateUserData(id, username, name, email, password, history, cash) {
    return axios.post(API_URL + id, {
      id,
      username,
      name,
      email,
      password,
      history,
      cash
    },
    { headers: authHeader() });
  }

}

export default new UserService();
