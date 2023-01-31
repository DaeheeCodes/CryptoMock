'use strict';
import AuthService from "./services/auth.service";
import axios from 'axios';
import authHeader from './services/auth-header';
import UserChart from './components/userChart';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { data } from './data/stats_for_Denmark';
import { currentAssetGetter, currentHoldingGetter, csvParse } from "./utils/tradeUtils";

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
			currentUser: { username: "" },
			currentHoldings: [],
			singleDays: []
		};
	}
    

	componentDidMount() { 
		setInterval(() => {
		const currentUser = AuthService.getCurrentUser();
		client({method: 'GET', path: '/api/singleDays'}).done(response => {
			this.setState({singleDays: response.entity._embedded.singleDays});
		});

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

    	const currentHoldings = currentHoldingGetter(csvParse(this.state.currentUser.history))
		const currentAssets = currentAssetGetter(currentHoldings, this.state.singleDays);
		const total = (parseInt(this.state.currentUser.cash) + parseInt(currentAssets))

		return (
			<div className="lowercomponent">
			<h1 className="headers">My standing</h1>
			<div>
			<h5>Total Standing: ${total} Current Cash: ${this.state.currentUser.cash} Current Assets: ${currentAssets}</h5>
			</div>
			<UserChart data={data} width={800} height={250}/>
			</div>
		)
	}
}

export default UserData