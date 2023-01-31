'use strict';
import MaterialTable from '@material-table/core';
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

import CryptoDetails from './components/cryptoDetails';
import AuthService from "./services/auth.service";

const client = require('./client');


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


export default function SingleDayTable() {

	const [singleDays, setSingleDays] =useState([])
	const [openPopup, setOpenPopup] = useState(false)
	const [bufferOn, setBufferOn] = useState(true)
	const [detailData, setDetailData] = useState([])
	const [currentUser, setCurrentUser] = useState([])
	const [currentHoldings, setCurrentHoldings] = useState([])

	const keys = new Map([
		["BTCUSD" , "Bitcoin"],
		["ETHUSD" , "Ethereum"],
		["USDCUSD" , "USD Coin"],
		["BNBUSD" , "Binance#BNB"],
		["BUSDUSD" , "Binance#BUSD"],
		["DOGEUSD" , "Dogecoin"],
		["ADAUSD" , "Cardano"],
		["MATICUSD" , "Polygon_(blockchain)"],
		["DAIUSD" , "Dai_(cryptocurrency)"],
		["DOTUSD" , "Polkadot_(cryptocurrency)"],
		["TRXUSD" , "Tron_(cryptocurrency)"],
		["LTCUSD" , "Litecoin"],
		["SHIBUSD" , "Shiba_Inu_(cryptocurrency)"],
		["SOLUSD", "Solana_(blockchain_platform)"],
		["XMRUSD" , "Monero"],
		["BCHUSD" , "Bitcoin_Cash"],
		["QNTUSD" , "Overledger"]
	]);

	const toggleBuffer = () => {
			if (bufferOn)
			{
			setBufferOn(false)
			}
				if (bufferOn == false)
			{
				setBufferOn(true)
			}
				console.log(bufferOn)
			};

			useEffect (() => {
				const user =AuthService.getCurrentUser();
			client({method: 'GET', path: '/api/singleDays'}).done(response => {
				setSingleDays(response.entity._embedded.singleDays);
			});
			if (user) {
			setCurrentUser(user);
			}
			// prevent loop on useEffect.
	}, [singleDays]);

	useEffect(() => {
		setInterval(() => {
			if(bufferOn) {
			client({method: 'GET', path: '/api/singleDays'}).done(response => {
				setSingleDays(response.entity._embedded.singleDays);
			});
		}
		  }, 5000);
		}, []);

		const columns = [
			{ title: 'Symbol', field: 'symbol' },
			{ title: 'Last Price', field: 'lastPrice', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:0, maximumFractionDigits:2} },
			{ title: 'Price Change', field: 'priceChangePercent' },
			{ title: 'Volume', field: 'volume' }
		  ];

		  var filter = ["BTCUSD", "ETHUSD", "USDCUSD", "BNBUSD", "BUSDUSD", "DOGEUSD", "ADAUSD", "MATICUSD", "DAIUSD", "DOTUSD", "TRXUSD", "LTCUSD", "SHIBUSD", "SOLUSD", "XMRUSD", "BCHUSD", "QNTUSD"];
		var temp = singleDays.filter(singleDay =>
			filter.includes(singleDay.symbol)
		);

		
		const data = [];

		for (let i = 0; i < temp.length; i++ ) {
			data[i] = {"symbol" : temp[i].symbol.slice(0,3),
"priceChangePercent" : temp[i].priceChangePercent,
"lastPrice" : temp[i].lastPrice,
"volume" : temp[i].volume,
"wiki" : keys.get(temp[i].symbol),
"fullSymbol" : temp[i].symbol
};
}

let options = {
	rowStyle: (rowData) => {
		return {
		  color:(parseInt(rowData.priceChangePercent) > 0 ? "green" : "red")
		};
	  }}

		return (
			<>
			<div className="lowercomponent">
			<h1 className="headers">Trade</h1>
			<div style={{ maxWidth: '100%' }}>
			<MaterialTable  icons={tableIcons} options ={options} columns={columns} data={data} 
			  title='Most Popular - Click on item to Trade' onRowClick={(event, rowData) => {
				{
				setOpenPopup(true);
				setDetailData(rowData);
			}}}/>
			</div>
			</div>
			<CryptoDetails
                title="Trade Window"
                openPopup={openPopup}
				detailData={detailData}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				setOpenPopup={setOpenPopup}
            ></CryptoDetails>
			</>
		)
	}



