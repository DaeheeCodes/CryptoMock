import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

    const { title, children, detailData, openPopup } = props;
    const classes = useStyles();

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
                <h1>Hi</h1>
            </DialogContent>
            <DialogActions>
        </DialogActions>
        </Dialog>
    )
}