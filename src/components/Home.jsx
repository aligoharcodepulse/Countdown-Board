import { useState } from 'react';
import { Button, Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import SuccessModal from '../Modals/SuccessModal';
import GetTasks from './GetTasks';
import GetTasksHistory from './GetTasksHistory';

const Home = () => {
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("To Do");
    const [successOpen, setSuccessOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSuccessClose = () => setSuccessOpen(false);

    const handleTaskNameChange = (event) => setTaskName(event.target.value);
    const handleTaskStatusChange = (event) => setTaskStatus(event.target.value);

    const handleAddTask = async () => {
        if (taskName) {
            try {
                await addDoc(collection(db, "tasks"), {
                    name: taskName,
                    status: taskStatus,
                });
                setSuccessOpen(true);
            } catch (error) {
                console.error("Error adding task to Firestore: ", error);
            }
            handleClose();
        }
    };

    return (
        <Container maxWidth='xl'>
            <Box sx={{ my: 6, textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" gutterBottom>Welcome to Our Latest Countdown Board Project!</Typography>
                <Typography variant="h5" gutterBottom>Just add your tasks here by clicking</Typography>
                <Typography variant="h5" gutterBottom>the below add task button.</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={handleOpen}>+ Add Task</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Task Name"
                            type="text"
                            fullWidth
                            value={taskName}
                            onChange={handleTaskNameChange}
                            required
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={taskStatus}
                                onChange={handleTaskStatusChange}
                                label="Status"
                                required
                            >
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleAddTask} color="primary">Add Task</Button>
                </DialogActions>
            </Dialog>
            <SuccessModal open={successOpen} onClose={handleSuccessClose} />
            <GetTasks /> {/* Display the tasks here */}
            <GetTasksHistory/>
        </Container>
    );
}

export default Home;
