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


const records = [
    {
        id: "1",
        dname: "Sunil Joshi",
        uname: "Sunil Joshi",
        date: "01/22/2022",
    },
    {
        id: "2",
        dname: "Sunil Joshi",
        uname: "Sunil Joshi",
        date: "01/22/2022",
    },
    {
        id: "3",
        dname: "Sunil Joshi",
        uname: "Sunil Joshi",
        date: "01/22/2022",
    },
    {
        id: "4",
        dname: "Sunil Joshi",
        uname: "Sunil Joshi",
        date: "01/22/2022",
    },
    {
        id: "5",
        dname: "Sunil Joshi",
        uname: "Sunil Joshi",
        date: "01/22/2022",
    },
    
   
];

const DoctorAssigned = () => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
            <BaseCard title="Doctor Assigned" action={<Link href="/doctor-assigned/add"><Button variant="contained" color="primary" sx={{marginBottom:'5px'}}>
            Assign Doctor
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
                                        Doctor Name
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
                                            {record.dname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {record.uname}
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

export default DoctorAssigned;
