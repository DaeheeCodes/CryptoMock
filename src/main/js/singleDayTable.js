'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const template = require('rest/interceptor/template');
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class SingleDayTable extends React.Component { // <1>

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
			<SingleDaysList singleDays={this.state.singleDays} />
		)
	}
}



class SingleDaysList extends React.Component{
	render() {
		
		const temps = this.props.singleDays.filter(singleDay =>
			singleDay.symbol.includes("USDT") == false
		);
		
		const singleDays = temps.map(singleDay =>
			<SingleDay key={singleDay._links.self.href} singleDay={singleDay}/>
		);

		
		var temp = singleDays.slice(0,50);


		return (
			<table>
				<tbody>
					<tr>
						<th>symbol</th>
						<th>priceChangePercent</th>
						<th>lastPrice</th>
						<th>volume</th>
						<th>action</th>
					</tr>
					{temp}
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
				<td><button onClick={console.log('You clicked submit.')}> Trade </button></td>
			</tr>
		)
	}
}



ReactDOM.render(
	<SingleDayTable />,
	document.getElementById('singleday')
)

