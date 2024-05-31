import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import {
  IconChevronDown,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";

const Profile = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Admin";

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {userName}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt: 0
          },
        }}
      >
        <Box pt={0}>
          <List>
            <Link href="/my-profile" passHref>
              <ListItemButton component="a">
                <IconButton size="small">
                  <IconUser color="black" />
                </IconButton>
                <ListItemText primary={<Typography color="textPrimary">My Profile</Typography>} />
              </ListItemButton>
            </Link>
          </List>
        </Box>
        <Divider />
        <Box mt={2}>
          <Button
            onClick={() => signOut()}
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<IconLogout />}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
