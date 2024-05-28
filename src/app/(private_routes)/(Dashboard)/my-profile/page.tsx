"use client";
import {
  Paper,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
  Input,
  InputLabel,
  MenuItem,
} from "@mui/material";
import BaseCard from "@/app/(private_routes)/(Dashboard)/components/shared/BaseCard";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitButton, setSubmitButton] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const sessionResponse = await axios.get('/api/auth/session');
        const sessionData = sessionResponse.data;

        if (sessionData.user) {
          setName(sessionData.user.name);
          setEmail(sessionData.user.email);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };
    fetchSessionData();
  }, []);

  

  const updateProfile = async (e: any) => {
    e.preventDefault();
    if (submitButton) {
      let fields = true;
      if (email === "") {
        toast.error("Email is Required");
        fields = false;
      }
      if (name === "") {
        toast.error("Name is Required");
        fields = false;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        fields = false;
      }
  
      if (fields) {
        try {
            setSubmitButton(false);
            const sessionResponse = await axios.get('/api/auth/session');
            const sessionData = sessionResponse.data;
            const userId = sessionData.user.id;
            const response = await fetch("/api/my-profile/update-profile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  name,
                  password: newPassword,
                  user_id: userId,
                }),
              });
  
              if (response.ok) {
                toast.success("Profile updated successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
          } else {
            const errorData = await response.json();
            toast.error(`Error: ${errorData.error}`);
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error('Error updating profile');
        } finally {
          setSubmitButton(true);
        }
      }
    } else {
      toast.error("Wait");
    }
  };
  
  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="My Profile">
          <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email-basic"
                label="Email"
                variant="outlined"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
            <br />
            <Stack spacing={3}>
              <FormLabel>Change Password</FormLabel>
              <TextField
                id="new-password-basic"
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                id="confirm-password-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Stack>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "5px" }}
              onClick={updateProfile}
            >
              Update Profile
            </Button>
          </>
        </BaseCard>
        <Toaster position="top-right" />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
