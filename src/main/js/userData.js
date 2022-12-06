'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const template = require('rest/interceptor/template');
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {userDatas: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/userDatas'}).done(response => {
			this.setState({userDatas: response.entity._embedded.userDatas});
		});
	}

	render() { // <3>
		return (
			<UserDataProfile userDatas={this.state.userDatas} />
		)
	}
}



class UserDataProfile extends React.Component{
	render() {
		
		const userDatas = this.props.userDatas.map(userData =>
			<UserData key={userData._links.self.href} userData={userData}/>
		);
		
		/*
		const singleDays = [];
		for (let i = 0; i < 11; i++) {
			temp = this.props.singleDays[i]
			singleDays.push(<SingleDay key={temp._links.self.href} singleDay={temp}/>)
		}*/
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


class UserData extends React.Component{
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
	<App />,
	document.getElementById('userdata')
)
