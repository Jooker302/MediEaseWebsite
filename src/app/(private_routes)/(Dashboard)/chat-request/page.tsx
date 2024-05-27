"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Paper, Modal, Box, TextField, MenuItem } from "@mui/material";
import BaseCard from '@/app/(private_routes)/(Dashboard)/components/shared/BaseCard';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Button,
} from "@mui/material";
import axios from 'axios';

interface AppointmentData {
    id: string;
    user_id: string;
    created_at: string;
    user_name?: string;
    doctor_id?: string;
}

interface DoctorData {
    _id: string;
    id: string;
    name: string;
}

// let temp_id;

const Appointments = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [doctors, setDoctors] = useState<DoctorData[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<string>(''); // Default to empty string to avoid undefined
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsResponse = await axios.get('/api/chat/chat-request');
                const fetchedAppointments = appointmentsResponse.data.data;

                console.log('Fetched Appointments:', fetchedAppointments);

                // Fetch user details for each appointment
                const userPromises = fetchedAppointments.map(async (appointment: AppointmentData) => {
                    try {
                        const userResponse = await axios.get(`/api/users?id=${appointment.user_id}`);
                        console.log('User Response for Appointment:', appointment.id, userResponse.data);

                        return {
                            ...appointment,
                            user_name: userResponse.data.name
                        };
                    } catch (error) {
                        console.error(`Error fetching user data for user_id ${appointment.user_id}:`, error);
                        return {
                            ...appointment,
                            user_name: 'Unknown'
                        };
                    }
                });

                const appointmentsWithUserNames = await Promise.all(userPromises);
                console.log('Appointments with User Names:', appointmentsWithUserNames);

                setAppointments(appointmentsWithUserNames);

                const doctorsResponse = await axios.get('/api/doctors');
                console.log(doctorsResponse.data);
                setDoctors(doctorsResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOpen = (appointment: AppointmentData) => {
        // temp_id = appointment.id;
        setSelectedAppointment(appointment);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAppointment(null);
        setSelectedDoctor('');
    };

    const handleAssignDoctor = async () => {
        if (!selectedAppointment || !selectedDoctor) return;

        try {
            await axios.post('/api/chat/assign-doctor', {
                appointment_id: selectedAppointment.id,
                doctor_id: selectedDoctor
            });
            console.log("Doctor assigned");

            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === selectedAppointment.id
                        ? { ...appointment, doctor_id: selectedDoctor }
                        : appointment
                )
            );

            handleClose();
        } catch (error) {
            console.error('Error assigning doctor:', error);
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="Chat Requests">
                    <TableContainer
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Table
                            aria-label="simple table"
                            sx={{
                                whiteSpace: "nowrap",
                                mt: 2,
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Appointment ID
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            User Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {appointment.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {appointment.user_name || 'Loading...'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontSize="15px" fontWeight={500}>
                                                {new Date(appointment.created_at).toLocaleDateString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => handleOpen(appointment)}>
                                                Assign Doctor
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </BaseCard>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="assign-doctor-modal"
                aria-describedby="assign-doctor-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="assign-doctor-modal" variant="h6" component="h2">
                        Assign Doctor
                    </Typography>
                    <TextField
                        select
                        label="Select Doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </MenuItem>
                        
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={handleAssignDoctor} fullWidth>
                        Assign
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
};

export default Appointments;
