'use strict';


const React = require('react');
const ReactDOM = require('react-dom'); 
const template = require('rest/interceptor/template');
const client = require('../client'); 


class UserData extends Component { 

	constructor(props) {
		super(props);
		this.state = {userDatas: []};
	}
    

	componentDidMount() { 
		client({method: 'GET', path: '/api/userDatas'}).done(response => {
			this.setState({userDatas: response.entity._embedded.userDatas});
		});
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



export default UserData
