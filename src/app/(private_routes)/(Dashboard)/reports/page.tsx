'use client';

import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import BaseCard from '@/app/(private_routes)/(Dashboard)/components/shared/BaseCard';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
} from "@mui/material";

const Reports = () => {
    interface Report {
        id: string;
        user_id: string;
        title: string;
        date: string;
    };
    const [records, setRecords] = useState<Report[]>([]);;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/user_report/reports'); // Assuming your API endpoint is '/api/users'
            const data = await response.json();
            // console.log("hellloooooo", data.data);
            setRecords(data.data); // Assuming the data is in the format { data: records }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="Reports" >
                    <TableContainer sx={{ width: "100%" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Patient Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Record Title
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
                                {loading ? (
                                    <TableRow key="test">
                                        <TableCell colSpan={4} align="center">
                                            <Typography>Loading...</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    records.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell>
                                                <Typography fontSize="15px" fontWeight={500}>
                                                    {record.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {record.user_id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {record.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">{record.date}</Typography>
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

export default Reports;
