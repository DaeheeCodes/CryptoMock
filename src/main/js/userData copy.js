'use strict';
import AuthService from "./services/auth.service";
import React, { Component } from "react";


const ReactDOM = require('react-dom'); 
const template = require('rest/interceptor/template');
const client = require('./client'); 


class UserData extends Component { 

	constructor(props) {
		super(props);
		this.state = {userDatas: [],
			redirect: null,
			userReady: false,
			currentUser: { username: "" }
		};
	}
    
	componentDidMount() { 
		const currentUser = AuthService.getCurrentUser();


		if (currentUser) {
		this.setState({ currentUser: currentUser, userReady: true })
		}

		(this.state.userReady) ? 
		client({method: 'GET', path: '/api/userDatas/' + currentUser.id}).done(response => {
			this.setState({userDatas: response.entity});
		}) : 
		client({method: 'GET', path: '/api/userDatas/638b8d00d9cf3102d2dcc638'}).done(response => {
			this.setState({userDatas: response.entity.username});
		})
				console.log(this.state.userDatas)

	}

	render() { 
		return (
			<UserDataProfile userDatas={this.state.userDatas} />
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
		console.log(this.state.userDatas)
		const userDatas = this.props.userDatas.map(userData =>
			<UserDatas key={userData._links.self.href} userData={userData}/>
		);
		
		const temp = userDatas
		return (
			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>email</th>
						<th>history</th>
						<th>cash</th>
					</tr>
					{temp}
				</tbody>
			</table>
		)
	}
}


class UserDatas extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.userData.name}</td>
				<td>{this.props.userData.email}</td>
				<td>{this.props.userData.history}</td>
				<td>{this.props.userData.cash}</td>
			</tr>
		)
	}
}



ReactDOM.render(
	<UserData />,
	document.getElementById('userdata')
)
