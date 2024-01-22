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
  // Select,
  MenuItem,
} from "@mui/material";
import BaseCard from "@/app/(private_routes)/(Dashboard)/components/shared/BaseCard";
import { styled } from "@mui/material/styles";
import SelectInput from "@mui/material/Select/SelectInput";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import ToastContainer, { toast } from 'react-hot-toast';
// import InputLabel from '@mui/material/InputLabel';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const UserAdd = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('Patient');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState();
  const [image, setImage] = useState<File | null>(null);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value as string);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Gender:", gender);
    console.log("Age:", age);
    console.log("Image: ", image);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("image", image);

    try {
      // Example handling response in client code
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          image,
          email,
          age,
          gender,
          role,
          name,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add User">
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
                onChange={(e) => setEmail(e.target.value)} />

              <TextField
                id="age-basic"
                label="Age"
                variant="outlined"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)} />
              <TextField
                id="pass-basic"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <FormControl variant="outlined">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  label="Role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value={'Patient'}>Patient</MenuItem>
                  <MenuItem value={'Doctor'}>Doctor</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={gender}
                  name="radio-buttons-group"
                  onChange={handleGenderChange}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />

                </RadioGroup>
              </FormControl>
              <FormControl>
                <InputLabel shrink htmlFor="file-input">Image</InputLabel>
                <Input
                  id="file-input"
                  type="file"
                  onChange={handleImageChange}
                />
              </FormControl>
            </Stack>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "5px" }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </>
        </BaseCard>
        <ToastContainer position="bottom-right" />
      </Grid>
      
    </Grid>
  );
};

export default UserAdd;
