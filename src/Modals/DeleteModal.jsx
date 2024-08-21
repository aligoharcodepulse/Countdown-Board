import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="center">
                    <DeleteIcon color="error" sx={{ fontSize: 60 }} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Deleted Successfully!
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

export default DeleteModal;
