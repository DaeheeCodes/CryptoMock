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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CryptoDetails from './components/cryptoDetails';

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
		this.state = {singleDays: [], bufferOn: true, openPopup: false, setOpenPopup: false, popUpData: []};
	}

	openInPopup () {
		this.setState({setOpenPopup: true});
    }
	
	toggleBuffer() {
			if (this.state.bufferOn)
			{
			this.setState ({
					bufferOn: false
				})
			}
				if (this.state.bufferOn == false)
			{
			this.setState ({
					bufferOn: true
				})}
				console.log(this.state.bufferOn)
			};

				
	componentDidMount() {
			client({method: 'GET', path: '/api/singleDays'}).done(response => {
				this.setState({singleDays: response.entity._embedded.singleDays});
			});
	}

	render() {	

		setInterval(() => {
			if(this.state.bufferOn) {
			client({method: 'GET', path: '/api/singleDays'}).done(response => {
				this.setState({singleDays: response.entity._embedded.singleDays});
			});
		}
		  }, 5000);

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
			<MaterialTable  icons={tableIcons} columns={columns} data={data} 
			  title='Most Popular - Click on item to Trade' onRowClick={(event, rowData) => {
				{this.toggleBuffer();
				this.setState({openPopup: true,
							   popUpData: rowData
				})
			}}}/>
			</div>
			<CryptoDetails
                title="Employee Form"
                openPopup={this.state.openPopup}
                setOpenPopup={this.setOpenPopup}
				popUpData={popUpData}
            >
            </CryptoDetails>
			</div>
		)
	}
}


// class CryptoDetails extends React.Component{
// 	constructor(props){
//         super(props);
//         this.state = {
//             currentCrypto: this.props.currentCrypto,
//         }
//     }

// 	render() {
// 		const {currentCrypto} = this.state;
		
// 		return (
// 			<div>
// 				<div className='rowA'><p>{currentCrypto.symbol}</p>
// 				<TextField
//           id="outlined-number"
//           label="Quantity"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
// 					<ButtonGroup aria-label="outlined primary button group">
// 						<Button>Buy</Button>
// 						<Button>Sell</Button>
// 					</ButtonGroup></div>
// 					<div>
// 					<object width="100%" height="500" data="https://en.wikipedia.org/wiki/Bitcoin" title="wikipedia">
// </object>
// 					</div>
// 			</div>
// 		)
// 	}
// }

export default SingleDayTable