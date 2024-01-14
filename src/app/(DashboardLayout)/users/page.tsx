import React from 'react';
import { Grid, Link, Paper } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
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


const users = [
    {
        id: "1",
        name: "Sunil Joshi",
        email: "admin@gmail.com",
        type: "Admin",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        email: "pateint@gmail.com",
        type: "Patient",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        email: "pateint@gmail.com",
        type: "Patient",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        email: "doctor@gmail.com",
        type: "Doctor",
    },
];

const Users = () => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
            <BaseCard title="Users" action={<Link href="/users/add"><Button variant="contained" color="primary" sx={{marginBottom:'5px'}}>
            Add User
              </Button></Link>}>
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
                                        Id
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.name}>
                                    <TableCell>
                                        <Typography fontSize="15px" fontWeight={500}>
                                            {user.id}
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
                                        <Typography variant="h6">{user.type}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </BaseCard>
            </Grid>
        </Grid>
    );
};

export default Users;
