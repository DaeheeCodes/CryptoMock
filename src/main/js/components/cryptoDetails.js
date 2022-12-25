import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, DialogActions, ButtonGroup, Button } from '@material-ui/core';
import { Title } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState, Fragment, useCallback } from 'react';

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

    const { title, children, detailData, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    
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
        console.log(wikiSummary)
        //stop inf loop and execute on prop change.
    }, [updateWikiData]);


    return (

        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {title}
                    </Typography>
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
            {/* {wikiSummary} */}
			</div>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setOpenPopup(false)}}>Close</Button>
        </DialogActions>
        </Dialog>
    )
}