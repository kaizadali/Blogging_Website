import React,{useState} from 'react';
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tab} from "@mui/material";
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import { authActions } from '../Redux/Store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Header = () => {
    //managing global global state of isLogin using useSelector hook of redux toolkit
    let isLogin=useSelector(state=>state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    const dispatch=useDispatch();

    const Navigate=useNavigate();
    //state which is normally managed by useState hook
    const [value, setValue] = useState();

    //logout function
    const handleCLick=()=>{
        try{
                dispatch(authActions.logout());
                toast.success("Logout Successfully");
                Navigate("/login");
                localStorage.clear();
        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4">My Blogs Appp</Typography>
                {isLogin && (<Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}> 
                    <Tabs textColor="inherit" value={value} onChange={(event,value)=>setValue(value)} />
                        <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                        <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                        <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                </Box>

                )}
                <Box display={'flex'} marginLeft={'auto'}>
                   {!isLogin && (<> <Button sx={{margin:1,color:'wheat'}} LinkComponent={Link} to="/login">Login</Button>
                    <Button sx={{margin:1,color:'wheat'}} LinkComponent={Link} to="register">Register</Button></>)}
                    {isLogin && (<Button onClick={handleCLick} sx={{margin:1,color:'wheat'}}>Logout</Button>)}
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
};

export default Header