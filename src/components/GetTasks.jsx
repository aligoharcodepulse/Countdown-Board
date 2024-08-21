import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { Box, Typography, Card, CardContent, IconButton, MenuItem, Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../Modals/DeleteModal'; // Import the DeleteModal component

const GetTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ ...doc.data(), id: doc.id });
            });
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
            setTasks(prevTasks =>
                prevTasks.map(task => task.id === taskId 
                    ? { ...task, status: newStatus } 
                    : task
                )
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            setIsDeleteModalOpen(true); // Open the delete modal
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const getColor = (status) => {
        switch (status) {
            case "To Do":
                return "#1976d2"; // Blue
            case "In Progress":
                return "#ffeb3b"; // Yellow
            case "Completed":
                return "#4caf50"; // Green
            default:
                return "#ffffff";
        }
    };

    const renderTasks = (tasks) => {
        return tasks.map((task) => (
            <Card
                key={task.id}
                sx={{
                    mb: 2,
                    backgroundColor: getColor(task.status),
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'background-color 0.3s ease',
                    position: 'relative',
                }}
            >
                <CardContent>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography variant="body2">Status: {task.status}</Typography>
                    <Select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        sx={{ mt: 2, backgroundColor: 'white' }}
                    >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </CardContent>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task.id)}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'white'
                    }}
                >
                    <DeleteIcon style={{color:'crimson'}}/>
                </IconButton>
            </Card>
        ));
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' }, // Stack in a column on small and medium screens
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', // Wraps content when necessary
                    mt: 4,
                }}
            >
                {["To Do", "In Progress", "Completed"].map((status) => (
                    <Box
                        key={status}
                        sx={{
                            width: { xs: '100%', sm: '100%', md: '30%' }, // 100% width on small/medium screens, 30% on large screens
                            minHeight: '200px',
                            padding: '10px',
                            backgroundColor: '#f4f4f4',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            mb: { xs: 2, sm: 2, md: 0 }, // Bottom margin for small and medium screens
                        }}
                    >
                        <Typography variant="h5" gutterBottom>{status}</Typography>
                        {renderTasks(tasks.filter(task => task.status === status))}
                    </Box>
                ))}
            </Box>
            <DeleteModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
        </>
    );
};

export default GetTasks;

