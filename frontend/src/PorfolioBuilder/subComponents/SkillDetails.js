import {
    CardContent,
    Divider,
    Grid,
    InputAdornment,
    TextField,
  } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import BusinessIcon from '@material-ui/icons/Business';
  import React, { useEffect, useState } from 'react';
  import LinkIcon from '@material-ui/icons/Link';
  import { v4 as uuidv4 } from 'uuid';
  import { Button } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Experiencefetch from '../fetching data/Experiencefetch';
import AboutFetch from '../fetching data/AboutFetch';
import Skillfetch from '../fetching data/Skillfetch';


  const SkillDetails = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
    const [inputs, setInputs] = useState({
      biography: '',
      seeking: '',
      hubby: '',
      love: '',
     
    });
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
const handlesubmit = (e)=>{
  e.preventDefault();
  sendRequestAdd();
  window.location.reload();
  
};

const sendRequestAdd = async() =>{
    const res = await axios
      .post('http://localhost:4000/api/skill/add', {
        biography: inputs.biography,
        seeking: inputs.seeking,
        hubby: inputs.hubby,
        love: inputs.love,
        user: userInfo.user._id,
       
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data; 
}
const [perosnalsx, setperosnals] = useState();
//fetch backend
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/skill/user/${userInfo.user._id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setperosnals(data.project.skilldetails));
  }, []);
  const[filter,setfilter]= useState("");
const filterNames = (names) =>{
 setfilter(names);
}
  const fetchdata = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/skill/${filter}`)
      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
  };
  useEffect(() => {
    fetchdata().then((data) => {
      console.log(data)
      setInputs({
        biography: data.perosnal.biography,
        seeking: data.perosnal.seeking,
        hubby: data.perosnal.hubby,
        love: data.perosnal.love,
        
      })
     } );
  }, [filter]);
  
  fetchdata();
  

const handleupdate = (e) => { 
  e.preventDefault();
  updateRequest();
  window.location.reload();

};
const updateRequest = async() =>{
  
  const res = await axios.put(`http://localhost:4000/api/skill/update/${filter}`,{
    biography: inputs.biography,
    seeking: inputs.seeking,
    hubby: inputs.hubby,
    love: inputs.love,
  }
  )
  const data = await res.data;
  return data;
}
const notitfy = (e)=>{
  e.preventDefault();
  toast.error('Please Fill All Data required', {
    position: "top-right",
    autoClose: 5003,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
const select = (e)=>{
  e.preventDefault();
  toast.error('Please Select Project to update', {
    position: "top-right",
    autoClose: 5003,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
    return(
        <div className="App mt-3">
      <div className="col-lg-10 mx-auto text-center">
        <div>
        <CardContent>
        <form onSubmit={handlesubmit}>
              <div className={props}>
  <Grid container spacing={2} alignItems="center" lg={12}>
    <Grid
      item
      xs={12}
      lg={4}
      alignItems="flex-end"
      alignContent="flex-end"
    >
      <h5>
        <CheckCircleIcon />
        <span className="pl-3">About </span>
      </h5>
    </Grid>
    <Grid item xs={0} lg={8} md={12}/>
    <Grid id="decrease"  item md={6} sm={12} xs={12} lg={6}>
      <TextField
        margin="dense"
        variant="outlined"
        name="biography"
        value={inputs.biography}
        onChange={handleChange}
        placeholder="Biography-Statment"
        style={{width: '80%'}}
        required
       
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <BusinessIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
    <Grid id="decrease"  item md={6} sm={12} xs={12} lg={6}>
      <TextField
        margin="dense"
        variant="outlined"
        name="seeking"
        value={inputs.seeking}
        onChange={handleChange}
        placeholder="Seeking-Statment"
        style={{width: '80%'}}
        required
      
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <EventSeatIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    <Grid id="decrease"  item md={6} sm={12} xs={12} lg={6}>
        <TextField
        margin="dense"
        variant="outlined"
        name="hubby"
        onChange={handleChange}
        value={inputs.hubby}
        placeholder="Huuby-Statment"
        style={{width: '80%'}}
        required
     
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <TimelapseIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
   

    <Grid id="decrease"  item md={6} sm={12} xs={12} lg={6}>
      <TextField
        margin="dense"
        placeholder="Love-Things-Do-Statment"
        variant="outlined"
        onChange={handleChange}
        value={inputs.love}
        style={{width: '80%'}}
        name="love"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  </Grid>
  <br />
  <Divider />
  
  
  <br />
                <button
               onClick={(inputs.biography ==="" || inputs.seeking==="" ||inputs.hubby==="" || inputs.love==="")?notitfy:handleupdate} disabled={perosnalsx?.length>0 ?false:true} 
                 className="button2">Update</button>

                <button className="button" type="submit">
                  Submit
                </button>
                <ToastContainer />  
                <Divider />
              </div>
            </form>
            <hr />
          </CardContent>
          {perosnalsx &&
             perosnalsx.map((personal, index) => (
              <div>
                <Skillfetch 
                  filteration={filterNames}
                  keyz={index}
                  id={personal._id}
                  biography={personal.biography}
                  seeking={personal.seeking}
                  hubby={personal.hubby}
                  love={personal.love}
                
                
                />
              

              </div>
            ))}

        </div>
        </div>
       
      </div>
    )}
export default SkillDetails 