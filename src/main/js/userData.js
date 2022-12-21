'use strict';
import AuthService from "./services/auth.service";
import axios from 'axios';
import authHeader from './services/auth-header';
import UserChart from './components/userChart';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { data } from './data/stats_for_Denmark';

const React = require('react');
const ReactDOM = require('react-dom'); 
const template = require('rest/interceptor/template');
const client = require('./client'); 

const API_URL = 'http://localhost:8080/api/userDatas/';

class UserData extends React.Component { 

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

		// Show mine if not logged in, show user's if they are.
		(this.state.userReady) ? 
		axios.get(API_URL + currentUser.id, { headers: authHeader() }).then((response) => this.setState({userDatas: response.data}))
		.catch((err) => console.log(err))  : 
		axios.get(API_URL + "638b8d00d9cf3102d2dcc638", { headers: authHeader() }).then((response) => this.setState({userDatas: response.data}))
		.catch((err) => console.log(err))
	}, 3000);
	
	}

	render() { 

		

		return (
			<div className="lowercomponent">
			<h1 className="headers">My standing</h1>
			<UserChart data={data} width={800} height={400}/>
			</div>
		)
	}
}

export default UserData