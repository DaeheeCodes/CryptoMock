'use strict';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { useState, useEffect } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const React = require('react');
const ReactDOM = require('react-dom');
const template = require('rest/interceptor/template');
const client = require('./client');




class SingleDayTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {singleDays: []};
	}

	componentDidMount() {
		setInterval(() => {
			client({method: 'GET', path: '/api/singleDays'}).done(response => {
				this.setState({singleDays: response.entity._embedded.singleDays});
			});
		  }, 5000);
	}

	render() {	
		const columns = [
			{ title: 'Symbol', field: 'symbol' },
			{ title: 'Last Price', field: 'lastPrice', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:0, maximumFractionDigits:2} },
			{ title: 'Price Change', field: 'priceChangePercent' },
			{ title: 'Volume', field: 'volume' }
		  ];

		  var filter = ["BTCUSD", "ETHUSD", "USDCUSD", "BNBUSD", "BUSDUSD", "DOGEUSD", "ADAUSD", "MATICUSD", "DAIUSD", "DOTUSD", "TRXUSD", "LTCUSD", "SHIBUSD", "SOLUSD", "XMRUSD", "BCHUSD", "QNTUSD"];
		var temp = this.state.singleDays.filter(singleDay =>
			filter.includes(singleDay.symbol)
		);

		const data = [];

		for (let i = 0; i < temp.length; i++ ) {
			data[i] = {"symbol" : temp[i].symbol.slice(0,3),
"priceChangePercent" : temp[i].priceChangePercent,
"lastPrice" : temp[i].lastPrice,
"volume" : temp[i].volume};

}

		return (
			<div className="lowercomponent">
			<h1 className="headers">Trade</h1>
			<div style={{ maxWidth: '100%' }}>
			<MaterialTable  icons={tableIcons} columns={columns} data={data} onRowClick={(event, rowData, togglePanel) => {
				togglePanel()
				console.log(rowData);
				event.stopPropagation;
			}}  detailPanel={rowData => {
				return (
					<div
					style={{
					  fontSize: 100,
					  textAlign: 'center',
					  color: 'white',
					  backgroundColor: '#43A047',
					}}
				  >
					{rowData.symbol}
				  </div> )
			  }}
			  title='Most Popular - Click on item to Trade' />
			</div>
			</div>
		)
	}
}


export default SingleDayTable