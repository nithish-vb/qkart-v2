import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import {useHistory,Link} from "react-router-dom";
const Header = ({ children, hasHiddenAuthButtons }) => {
  const history=useHistory();

  
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <div>
        {children}
        </div>
        {localStorage.getItem("username") !==null?  
        <Stack direction ="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}    >
       
       <Box><Avatar  src="avatar.png" alt={localStorage.getItem("username")} />
        <Box> {localStorage.getItem("username")} </Box>
          <Button className="button" onClick={()=>{
            localStorage.clear();history.push("/");window.location.reload();
        }}>
            LOGOUT
          </Button>
        </Box>
        </Stack>
        : hasHiddenAuthButtons ? 

        
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text" onClick={()=>{history.push("/")}}
        >
          Back to explore
        </Button>
          :
        <Stack direction ="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}    >
        
          <Button className="explore-button" onClick={()=>{history.push("/login")}}>
            LOGIN
          </Button>
        
          <Button className="button" variant="contained" onClick={()=>{history.push("/register")}}>
            REGISTER
          </Button>
        </Stack>
      }
      </Box>
    );
};

export default Header;
