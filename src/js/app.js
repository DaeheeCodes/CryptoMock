'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {singleDays: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/singleDays'}).done(response => {
			this.setState({singleDays: response.entity._embedded.singleDays});
		});
	}

	render() { // <3>
		return (
			<SingleDaysList singleDays={this.state.singleDays}/>
		)
	}
}



class SingleDaysList extends React.Component{
	render() {
		const singleDays = this.props.singleDays.map(singleDay =>
			<SingleDay key={singleDay._links.self.href} singleDay={singleDay}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>symbol</th>
						<th>priceChangePercent</th>
						<th>lastPrice</th>
						<th>volume</th>
					</tr>
					{singleDays}
				</tbody>
			</table>
		)
	}
}


class SingleDay extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.singleDay.symbol}</td>
				<td>{this.props.singleDay.priceChangePercent}</td>
				<td>{this.props.singleDay.lastPrice}</td>
				<td>{this.props.singleDay.volume}</td>
			</tr>
		)
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('react')
)

