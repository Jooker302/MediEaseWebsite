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
import BaseCard from "@/app/(private_routes)/(Dashboard)/components/shared/BaseCard";
import { styled } from "@mui/material/styles";
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
        <BaseCard title="Assign Doctor">
          <>
            <Stack spacing={3}>
              
           
              <Select
                id="demo-simple-select"
                label="Users"
              >
                <MenuItem value="User 1">User 1</MenuItem>
                <MenuItem value="User 2">User 2</MenuItem>
              </Select>

              <Select
                id="demo-simple-select"
                label="Doctor"
              >
                <MenuItem value="Doctor 1">Doctor 1</MenuItem>
                <MenuItem value="Doctor 2">Doctor 2</MenuItem>
              </Select>

              
            </Stack>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "5px" }}
            >
              Assign
            </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default UserAdd;
