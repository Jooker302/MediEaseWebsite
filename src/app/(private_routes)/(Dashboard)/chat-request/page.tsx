'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Modal, Box, TextField, MenuItem, CircularProgress } from "@mui/material";
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
import { toast, Toaster } from 'react-hot-toast';

interface AppointmentData {
    id: string;
    user_id: string;
    created_at: string;
    user_name?: string;
    doctor_id?: string;
    doctor_name?: string;
}

interface DoctorData {
    _id: string;
    id: string;
    name: string;
}

const Appointments = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [doctors, setDoctors] = useState<DoctorData[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<string>(''); // Default to empty string to avoid undefined
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const appointmentsResponse = await axios.get('/api/chat/chat-request');
            const fetchedAppointments = appointmentsResponse.data.data;

            console.log('Fetched Appointments:', fetchedAppointments);

            const doctorsResponse = await axios.get('/api/doctors');
            const fetchedDoctors = doctorsResponse.data.data;
            setDoctors(fetchedDoctors);

            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = (appointment: AppointmentData) => {
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

        setAssigning(true);
        try {
            const response = await axios.post('/api/chat/assign-doctor', {
                appointment_id: selectedAppointment.id,
                doctor_id: selectedDoctor
            });

            if (response.status === 200) {
                toast.success("Doctor assigned successfully");

                // Re-fetch appointments after successful assignment
                await fetchData();

                handleClose();
            }
        } catch (error) {
            console.error('Error assigning doctor:', error);
            toast.error("Error assigning doctor");
        } finally {
            setAssigning(false);
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
                                            Assigned Doctor
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
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    appointments.map((appointment) => (
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
                                                <Typography color="textSecondary" variant="h6">
                                                    {appointment.doctor_name || '-'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {appointment.doctor_id ? (
                                                    '-'
                                                ) : (
                                                    <Button variant="contained" color="primary" onClick={() => handleOpen(appointment)}>
                                                        Assign Doctor
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
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
                        disabled={assigning}
                    >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAssignDoctor}
                        fullWidth
                        disabled={assigning}
                    >
                        {assigning ? <CircularProgress size={24} /> : "Assign"}
                    </Button>
                </Box>
            </Modal>

            <Toaster />
        </Grid>
    );
};

export default Appointments;
