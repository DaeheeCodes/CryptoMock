import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/userDatas/';

class TradeService {
  updateUserData(id, username, name, email, password, history, cash) {
    return axios.put(API_URL + id, {
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

export default new TradeService();
