import React, { Component, forwardRef } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import TradeService from "../services/trade.service";
import { currentHoldingGetter, csvParse } from '../utils/tradeUtils';
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
import MaterialTable from 'material-table';

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

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      currentHoldings: []
    };

    const data = [];
  }

  

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true, currentHoldings: (currentHoldingGetter(csvParse(currentUser.history))) })
    
  
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

  
    const columns = [
			{ title: 'Symbol', field: 'symbol' },
      { title: 'Type', field: 'type' },
			{ title: 'Volume', field: 'volume' },
      { title: 'Price', field: 'price', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:5} },
      { title: 'Cash', field: 'cash' },
      { title: 'Date', field: 'data' }
		  ];

    const { currentUser } = this.state;

    const transactionHistory =  (csvParse(currentUser.history));
    const data = [];

    for (let i = 0; i < transactionHistory.length; i++ ) {
     data[i] = {"symbol" : transactionHistory[i].symbol.slice(0,3),
"type" : transactionHistory[i].type,
"volume" : transactionHistory[i].volume,
"price" :transactionHistory[i].price,
"cash" : transactionHistory[i].cash,
"data" : transactionHistory[i].data
};
}
  
    return (
      <div className="container profile-container">
        {(this.state.userReady) ?
        <div>
        <header>
          <h3>
            <strong>{(currentUser.username).toUpperCase()}</strong>
          </h3>
        </header>
        <p>
          <strong>Cash:</strong>{" "}
          {currentUser.cash}
        </p>
        <p>
          <strong>Holdings:</strong>{" "}
          {this.state.currentHoldings}
        </p>
        <p> 
          <MaterialTable  icons={tableIcons} columns={columns} data={data} 
			  title='Trasaction History' />
        </p>
        {/* transaction history table */}
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}
