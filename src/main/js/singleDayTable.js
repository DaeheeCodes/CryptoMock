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

	constructor(props) {
		super(props);
		this.state = {searchInput : ''};
	  }

	onInputChange (event) {
		event.preventDefault();
        this.setState({searchInput: event.target.value})
		if (searchInput.length > 0) {
			temps.filter(x =>
				x.symbol.includes(searchInput))
		};
    };


	render() {

		var temps = this.props.singleDays.filter(singleDay =>
			singleDay.symbol.includes("USDT") == false
		);

		

		const singleDays = temps.map(singleDay =>
			<SingleDay key={singleDay._links.self.href} singleDay={singleDay}/>
		);
	

		var temp = singleDays.slice(0,50);


		return (
			
			<div>
                    <div>
                        <label>Global Search</label>
                        <input 
                            type="text" 
							placeholder="Search here"
                            defaultValue={this.state.searchInput} 
                            onChange={this.onInputChange}
                        />
                    </div>
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
				</div>
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
/*
class SearchSingleDay extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {searchInput : ""};
	}
	render() {


		const handleChange = (e) => {
			e.preventDefault();
			setSearchInput(e.target.value);
		  };
		  
		  if (searchInput.length > 0) {
			  temps.filter((x) => {
			  return x.symbol.includes(searchInput);
		  });
		  }

	<input
	type="search"
	placeholder="Search here"
	onChange={handleChange}
	value={this.state.searchInput} />
	}
}
*/

ReactDOM.render(
	//<SearchSingleDay />,
	<SingleDayTable />,
	document.getElementById('singleday')
)

