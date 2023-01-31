import React, { Component, forwardRef } from "react";
import { Navigate } from "react-router-dom";
import { withRouter } from '../common/with-router'
import AuthService from "../services/auth.service";
import TradeService from "../services/trade.service";
import { currentHoldingGetter, csvParse } from '../utils/tradeUtils';
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
import MaterialTable from '@material-table/core';
import CloseIcon from '@mui/icons-material/Close';

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

class Profile extends Component {
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
    this.setState({ currentUser: currentUser, userReady: true })  
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
    const currentHoldings = currentHoldingGetter(csvParse(currentUser.history))
    let myKeys = [];
    currentHoldings.forEach((value, key) => myKeys.push(key));
    const transactionHistory =  csvParse(currentUser.history);
    const data = [];
if (transactionHistory) {
    for (let i = 0; i < transactionHistory.length; i++ ) {
     data[i] = {"symbol" : transactionHistory[i].symbol.slice(0,3),
"type" : transactionHistory[i].type,
"volume" : transactionHistory[i].volume,
"price" :transactionHistory[i].price,
"cash" : transactionHistory[i].cash,
"data" : (new Date(parseInt(transactionHistory[i].data))).toLocaleString()
}
}
};
return (
  <div className="container profile-container">
    <button onClick={()=>this.props.router.navigate(-1)} >
    <CloseIcon/>
    </button>
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
      { 
    myKeys.map((item) => <li>{item} : {currentHoldings.get(item)}</li>) 
  }
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

export default withRouter(Profile);