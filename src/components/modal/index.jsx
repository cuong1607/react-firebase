import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ header, title, isLogout , onClickClose, onClickComfirm }) {
    
    return (
        <div>
            <Dialog
                open={isLogout}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClickClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickClose}>Hủy</Button>
                    <Button onClick={onClickComfirm}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}