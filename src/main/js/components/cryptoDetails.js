import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, ButtonGroup, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState, Fragment, useCallback } from 'react';
import { currentHoldingGetter, csvParse } from '../utils/tradeUtils';
import TradeService from "../services/trade.service";
import axios from 'axios';
import authHeader from '../services/auth-header';

const wiki = require('wikipedia');
const API_URL = 'http://localhost:8080/api/userDatas/';

export default function CryptoDetails(props) {

    const [wikiSummary, setWikiSummary] =useState(null)
	const [currentHoldings, setCurrentHoldings] = useState([])
    const [executedTrade, setExecutedTrade] = useState([])
    const [volumeRequested, setVolumeRequested] = useState('')
    const { title, children, detailData, openPopup, setOpenPopup, currentUser, setCurrentUser } = props;

    const getCurrentHoldings = useCallback(async () => {
        try {
            let string = props.currentUser.history
       setCurrentHoldings (currentHoldingGetter(csvParse(currentUser.history)));
    } catch (error) {
    }
    }, [props.currentUser.history]);
    
    const updateWikiData = useCallback(async () => {
        try {
            const page = await wiki.summary(props.detailData.wiki);
            //Response of type @Page object
            setWikiSummary(page.extract);
            //Response of type @wikiSummary - contains the intro and the main image
        } catch (error) {
        }
    }, [props.detailData.wiki]);

    useEffect(() => {
        //retrieve wiki summary
        updateWikiData();
        if(currentUser.history?.length  > 0) {
        console.log(csvParse(currentUser.history));
        console.log(currentHoldings);
    }
        //stop inf loop and execute on prop change.
    }, [updateWikiData]);

    useEffect(() => {
        if(currentUser.history?.length  > 0) {

            getCurrentHoldings();
  
                  }
    }, [getCurrentHoldings]);

    const executeSale = () => {
        const current = currentHoldings.get(detailData.fullSymbol)
        if (current > volumeRequested) {
                const tempCash = (current * detailData.lastPrice);
                const tempHistory = currentUser.history;
                const cash = parseInt(currentUser.cash) + parseInt(tempCash);
                const added =  `*${detailData.fullSymbol},SELL,${volumeRequested},${detailData.lastPrice},${cash},${Date.now()}\n`
                TradeService.updateUserData(currentUser.id, currentUser.username, currentUser.name, currentUser.email, currentUser.password,(tempHistory + added), cash)
                const user = TradeService.getUserData(currentUser.id);
                setCurrentUser(user);
                getCurrentHoldings();
                alert("Trade Executed")
                console.log(currentHoldings);
        }    
        else {
            alert("Insufficent Holdings")
            console.log(currentHoldings);
        }
    }


    const executeBuy = ( ) => {
        var current =  currentUser.cash
        if (current > (volumeRequested * detailData.lastPrice)) {
            const tempHistory = currentUser.history;
            current = current - (volumeRequested * detailData.lastPrice);
            const added =  `*${detailData.fullSymbol},BUY,${volumeRequested},${detailData.lastPrice},${current},${Date.now()}\n`
            TradeService.updateUserData(currentUser.id, currentUser.username, currentUser.name, currentUser.email, currentUser.password, (tempHistory + added), current)
            const user = TradeService.getUserData(currentUser.id);
            setCurrentUser(user);
            getCurrentHoldings();
            alert("Trade Executed")
            console.log(currentHoldings);
        }
        else {
            alert("Insufficent Funds")
            console.log(currentHoldings);
        }
    }


    return (

        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle >
                <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {title}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <div>
				<div className='rowA'><p>{detailData.symbol}</p>
                {/* {(currentUser.history?.length  > 10)  ? (
                    <p>{currentHoldings.get(detailData.fullSymbol)}</p>
                ): (<p></p>) } */}
				<TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          onChange ={e => setVolumeRequested(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
					<ButtonGroup aria-label="outlined primary button group">
						<Button onClick={()=>{executeBuy()}}>Buy</Button>
						<Button onClick={()=>{executeSale()}}>Sell</Button>
					</ButtonGroup></div>
            {wikiSummary} 
		</div>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setOpenPopup(false)}}>Close</Button>
        </DialogActions>
        </Dialog>
    )
}

