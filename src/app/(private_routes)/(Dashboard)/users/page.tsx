'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Link, Paper, CircularProgress } from "@mui/material";
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

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    age: number;
    gender: string;
    image: string;
}

const Users = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users');  // Replace with your actual API endpoint
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="Users" action={
                    <Link href="/users/add">
                        <Button variant="contained" color="primary" sx={{ marginBottom: '5px' }}>
                            Add User
                        </Button>
                    </Link>
                }>
                    <TableContainer
                        sx={{
                            width: "100%", // Set width to 100%
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
                                            ID
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Type
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Age
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Gender
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow key="loading">
                                        <TableCell colSpan={6} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {user._id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {user.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {user.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography variant="h6">{user.role}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize="15px" fontWeight={500}>
                                                    {user.age}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize="15px" fontWeight={500}>
                                                    {user.gender}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </BaseCard>
            </Grid>
        </Grid>
    );
};

export default Users;
