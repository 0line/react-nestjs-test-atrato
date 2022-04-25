import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Avatar from '@mui/material/Avatar';
import { grey, blue } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";
import Alert from '@mui/material/Alert';
import Loading from 'react-fullscreen-loading';
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'85vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserEditModal(props) {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [alert, setAlert] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const handleOpen = (currentUser) => {
      setOpen(true)
      setCurrentUser(currentUser);
      setStatus(currentUser.status);
    };

    const handleClose = () =>{ 
      setOpen(false);
    };

    const onSubmit= (e)=>{
      e.preventDefault();
      setLoad(true);
      fetch("http://localhost:5000/users/" + currentUser.id, {
				method: "PUT",
				body: JSON.stringify(currentUser),
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			})
				.then((res) => res.json())
				.then(
					(result) => {            
            if(typeof result.success !== 'undefined' && result.success != false){
              setAlert({type:'success',message:result.message});
              setCurrentUser('');
              setTimeout(()=>{
                handleClose();
              },3000);
            }
            else{
              setAlert({type:'error',message:result.message});
            }
            setLoad(false); 
					},
					(error) => {
						console.log(error);
            setAlert({type:'error',message:error.message.join()});
            setLoad(false);
					}
				);
    }
    
  return (
    <div>
      <Button onClick={()=> handleOpen(props.user)} sx={props.sx} aria-label="add to shopping cart">
				{props.text}	<ModeEditIcon />
			</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Loading loading={load} background="#E3E5E9" loaderColor="#3363FF" />            
          <Grid container px={4}>
            <Grid item xs={6}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar usuario
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{display: 'flex', flexDirection: 'row', 
				    justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center'}}>
              <IconButton onClick={handleClose} aria-label="close" >
                <CloseIcon />
              </IconButton>
            </Grid>

          </Grid>
          {
            (typeof alert !== 'undefined' && alert !== null && alert !== '') ? (
              <Alert severity={alert.type}>{alert.message}</Alert>
            ):
            (<div></div>)}        
          <Box component="form" id="frmupdate" noValidate autoComplete="off" onSubmit={onSubmit}>
            <Grid container spacing={2} px={4} my={1}>
              <Grid item xs={12} sm={4} my={1}>
                <TextField type="text" fullWidth label="nombre" name="firstname" variant="filled" size='normal'
                 defaultValue={currentUser.firstname}
                 value={currentUser.firstname}
                 onChange={(e)=>{setCurrentUser({...currentUser,firstname:e.target.value})}}
                 required
                 focused 
                >
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} my={1}>
                <TextField fullWidth label="apellido paterno" variant="filled" size='normal'
                  defaultValue={currentUser.lastname}
                  value={currentUser.lastname}
                  onChange={(e)=>{setCurrentUser({...currentUser,lastname:e.target.value})}}
                  name="lastname"
                  focused 
                >
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} my={1}>
                <TextField fullWidth label="apellido materno" variant="filled"
                 size='normal'
                 defaultValue={currentUser.second_lastname}
                 value={currentUser.second_lastname}
                 onChange={(e)=>{setCurrentUser({...currentUser,second_lastname:e.target.value})}}
                 focused >
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} px={4} my={1}>
              <Grid item xs={12} sm={4} my={1}>
                <TextField fullWidth label="email" variant="filled" 
                size='normal'
                defaultValue={currentUser.email}
                value={currentUser.email}
                onChange={(e)=>{setCurrentUser({...currentUser,email:e.target.value})}}
                focused >
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} my={1}>
                <TextField fullWidth label="telefono" variant="filled" 
                size='normal'
                defaultValue={currentUser.phone}
                value={currentUser.phone}
                onChange={(e)=>{setCurrentUser({...currentUser,phone:e.target.value})}}
                focused >
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} my={1}>
                <TextField fullWidth label="fecha nacimiento" variant="filled" 
                size='normal'
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={moment(currentUser.birthday).format("YYYY-MM-DD")}
                value={moment(currentUser.birthday).format("YYYY-MM-DD")}
                onChange={(e)=>{setCurrentUser({...currentUser,birthday:e.target.value})}}
                focused >
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} px={4} my={1}>
              <Grid item xs={12} sm={6} my={1}>
                <TextField fullWidth label="analista" variant="filled" 
                size='normal'
                defaultValue={currentUser.analyst}
                value={currentUser.analyst}
                onChange={(e)=>{setCurrentUser({...currentUser,analyst:e.target.value})}}
                focused>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} my={1}>
                <FormControl sx={{ width: 200, minWidth: 200, color: blue[800], borderColor: 'blue.800',
                  }}>
                      <InputLabel id="status-select-label" sx={{color: blue[800]}}>
                        Status
                      </InputLabel>
                      <Select
                      labelId="status-select-label"
                      id="status-user"
                      value={status}
                      label="Status"
                      onChange={(e)=>{setCurrentUser({...currentUser,status:e.target.value}); setStatus(e.target.value);}}
                      displayEmpty
                      sx={{width: '100%' , minWidth: 100, color: blue[800] }}
                      >
                      <MenuItem value={"pendiente"}>PENDIENTE</MenuItem>
                      <MenuItem value={"en proceso"}>EN PROCESO</MenuItem>
                      <MenuItem value={"completado"}>COMPLETADO</MenuItem>
                      </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container px={4}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', 
				    justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center'}}>
              <Button type="submit" variant="contained" aria-label="enviar" primary>
                Enviar<SendIcon />
              </Button>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}