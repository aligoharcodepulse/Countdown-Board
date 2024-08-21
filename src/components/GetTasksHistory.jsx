import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GetTasksHistory = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                const task = { ...doc.data(), id: doc.id };
                // Add the task to the array, or update it if it already exists
                tasksData.push(task);
            });
            // Update the state with the fetched tasks
            setTasks(prevTasks => {
                // Create a map of existing tasks for quick lookup
                const existingTasksMap = new Map(prevTasks.map(task => [task.id, task]));
                const newTasksMap = new Map(tasksData.map(task => [task.id, task]));

                // Update existing tasks' status if they are no longer present in the fetched data
                const updatedTasks = [...prevTasks];
                for (const [id] of existingTasksMap) {
                    if (!newTasksMap.has(id)) {
                        updatedTasks.find(t => t.id === id).status = "Deleted";
                    }
                }
                // Add new tasks or update existing ones
                for (const [id, task] of newTasksMap) {
                    const index = updatedTasks.findIndex(t => t.id === id);
                    if (index !== -1) {
                        updatedTasks[index] = task;
                    } else {
                        updatedTasks.push(task);
                    }
                }

                return updatedTasks;
            });
        });

        return () => unsubscribe();
    }, []);

    return (
        <Container maxWidth='xl' sx={{ my: 6 }}>
            <Typography variant="h4" gutterBottom>
                Tasks History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default GetTasksHistory;
