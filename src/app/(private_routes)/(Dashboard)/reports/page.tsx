import React from 'react';
import { Grid, Link, Paper } from "@mui/material";
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


const records = [
    {
        id: "1",
        pname: "Sunil Joshi",
        file: "File Name/Path",
        date: "1/1/2020",
    },
    {
        id: "2",
        pname: "Sunil Joshi",
        file: "File Name/Path",
        date: "1/1/2020",
    },
    {
        id: "3",
        pname: "Sunil Joshi",
        file: "File Name/Path",
        date: "1/1/2020",
    },
    {
        id: "4",
        pname: "Sunil Joshi",
        file: "File Name/Path",
        date: "1/1/2020",
    },

    
];

const Users = () => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
            <BaseCard title="Reports" >
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
                                        Patient Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Record File
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Date
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>
                                        <Typography fontSize="15px" fontWeight={500}>
                                            {record.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {record.pname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {record.file}
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography variant="h6">{record.date}</Typography>
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
