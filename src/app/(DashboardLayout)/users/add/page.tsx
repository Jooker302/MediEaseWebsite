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
  Select,
  MenuItem,
} from "@mui/material";
import BaseCard from "@/app/(DashboardLayout)/components/shared/BaseCard";
import { styled } from "@mui/material/styles";
import SelectInput from "@mui/material/Select/SelectInput";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const UserAdd = () => {
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
                defaultValue=""
              />
              <TextField id="email-basic" label="Email" variant="outlined" />
              <TextField
                id="pass-basic"
                label="Password"
                // type="password"
                variant="outlined"
              />
           
              <Select
                id="demo-simple-select"
                label="Type"
                // variant="outlined"
                // value={}
                // onChange={}
              >
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
              </Select>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "5px" }}
            >
              Add
            </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default UserAdd;
