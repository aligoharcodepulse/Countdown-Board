import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="center">
                    <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Successful!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained" fullWidth>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessModal;
