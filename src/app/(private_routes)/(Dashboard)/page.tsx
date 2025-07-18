'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Box, Card, CardContent, Typography, CardActionArea, CircularProgress } from '@mui/material';
import PageContainer from '@/app/(private_routes)/(Dashboard)/components/container/PageContainer';
import Link from 'next/link';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    doctors: 0,
    chatRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/dashboard-stats', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const data = await response.json();

        setCounts({
          users: data.users || 0,
          doctors: data.doctors || 0,
          chatRequests: data.chatRequests || 0,
        });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Link href="/users" passHref>
              <CardActionArea component="a">
                <Card sx={{ backgroundColor: '#BBDEFB' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Users
                    </Typography>
                    {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography variant="h4" component="div">
                        {counts.users}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Link href="/doctors" passHref>
              <CardActionArea component="a">
                <Card sx={{ backgroundColor: '#C8E6C9' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Doctors
                    </Typography>
                    {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography variant="h4" component="div">
                        {counts.doctors}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Link href="/chat-request" passHref>
              <CardActionArea component="a">
                <Card sx={{ backgroundColor: '#FFCDD2' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Chat Requests
                    </Typography>
                    {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography variant="h4" component="div">
                        {counts.chatRequests}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
          
          {error && (
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" color="error" component="div" style={{ textAlign: 'center', marginTop: '20px' }}>
                Error: {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
