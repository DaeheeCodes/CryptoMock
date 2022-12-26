import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, DialogActions, ButtonGroup, Button } from '@material-ui/core';
import { Title } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState, Fragment, useCallback } from 'react';
import { currentHoldingGetter, csvParse } from '../utils/tradeUtils';
const wiki = require('wikipedia');

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function CryptoDetails(props) {

    const [wikiSummary, setWikiSummary] =useState(null)
	const [currentHoldings, setCurrentHoldings] = useState([])

    const { title, children, detailData, openPopup, setOpenPopup,currentUser } = props;
    const classes = useStyles();

    const getCurrentHoldings = useCallback(async () => {
        try {
       setCurrentHoldings (currentHoldingGetter(csvParse(props.currentUser.history)));
    } catch (error) {
        //=> Typeof wikiError
    }
    }, [props.currentUser.history]);
    
    const updateWikiData = useCallback(async () => {
        try {
            const page = await wiki.summary(props.detailData.wiki);
            //Response of type @Page object
            setWikiSummary(page.extract);
            //Response of type @wikiSummary - contains the intro and the main image
        } catch (error) {
            //=> Typeof wikiError
        }
    }, [props.detailData.wiki]);

    useEffect(() => {
        //retrieve wiki summary
        updateWikiData();
        console.log(csvParse(currentUser.history));
        //stop inf loop and execute on prop change.
    }, [updateWikiData]);

    useEffect(() => {
        if(currentUser.history?.length  > 0) {

            getCurrentHoldings();
            console.log(currentHoldings);
        }
    }, [getCurrentHoldings]);

    return (

        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                {currentUser.name?.length   ? (
                <div>
                 {currentHoldings[0]}
                 </div>
            ) :  (
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {title}
                    </Typography>
            )
            }
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <div>
				<div className='rowA'><p>{detailData.symbol}</p>
				<TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
					<ButtonGroup aria-label="outlined primary button group">
						<Button>Buy</Button>
						<Button>Sell</Button>
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

/*
            {currentUser.name?.length  > 0 ? (
                <div>
                 {currentUser.name}
                 </div>
            ) : (
            <div>
            {wikiSummary}
            </div>)
*/