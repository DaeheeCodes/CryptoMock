'use strict';
import AuthService from "./services/auth.service";
import axios from 'axios';
import authHeader from './services/auth-header';

const React = require('react');
const ReactDOM = require('react-dom'); 
const template = require('rest/interceptor/template');
const client = require('./client'); 

const API_URL = 'http://localhost:8080/api/userDatas/';

class UserProfile extends React.Component { 


	
	constructor(props) {
		super(props);
		this.state = {userDatas: [],
			redirect: null,
			userReady: false,
			currentUser: { username: "" }
		};
	}
    

	componentDidMount() { 
		setInterval(() => {
		const currentUser = AuthService.getCurrentUser();


		if (currentUser) {
		this.setState({ currentUser: currentUser, userReady: true })
		}

		(this.state.userReady) ? 
		axios.get(API_URL + currentUser.id, { headers: authHeader() }).then((response) => this.setState({userDatas: response.data}))
		.catch((err) => console.log(err))  : 
		axios.get(API_URL + "638b8d00d9cf3102d2dcc638", { headers: authHeader() }).then((response) => this.setState({userDatas: response.data}))
		.catch((err) => console.log(err))
	}, 3000);
	
	}

	render() { 
		return (
			<UserDataProfile userData={this.state.userDatas} />
		)
	}
}

/**
 * @todo history should be hash map of {date: { coin
 *                                              strike price
 *                                              volume
 *                                              sell or buy  }}
 * @todo Implement this function.
 */



class UserDataProfile extends React.Component{
	render() {
		
		return (
			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>email</th>
						<th>history</th>
						<th>cash</th>
					</tr>
					<tr>
				<td>{this.props.userData.name}</td>
				<td>{this.props.userData.email}</td>
				<td>{this.props.userData.history}</td>
				<td>{this.props.userData.cash}</td>
			</tr>
				</tbody>
			</table>
		)
	}
}




ReactDOM.render(
	<UserProfile />,
	document.getElementById('userdata')
)