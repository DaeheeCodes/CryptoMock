'use strict';
import AuthService from "./services/auth.service";


const React = require('react');
const ReactDOM = require('react-dom'); 
const template = require('rest/interceptor/template');
const client = require('./client'); 


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
		client({method: 'GET', path: '/api/userDatas/' + currentUser.id}).done(response => {
			this.setState({userDatas: response.entity});
		}) : 
		client({method: 'GET', path: '/api/userDatas/638b8d00d9cf3102d2dcc638'}).done(response => {
			this.setState({userDatas: response.entity});
		})
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