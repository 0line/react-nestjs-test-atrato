import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import Loading from 'react-fullscreen-loading';

export default function DeleteUser(props) {

    console.log(props)
  const [open, setOpen] = React.useState(false);
  const [user, setUser]=  React.useState('');
  const [load, setLoad] = React.useState(false);
  const handleClickOpen = (currentUser) => {
    setOpen(true);
    setUser(currentUser);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit= (e)=>{
      e.preventDefault();
      setLoad(true);
      const iduser = e.target.getAttribute("data-id");
      fetch("http://localhost:5000/users/" + iduser, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			})
			.then((res) => res.json())
			.then(
				(result) => {            
                    if(typeof result.success !== 'undefined' && result.success != false){
                    setTimeout(()=>{
                        handleClose();
                    },3000);
                }
                props.updateUsers();
                setLoad(false); 
            },
            (error) => {
                console.log(error);
                setLoad(false);
            }
        );
    }

  return (
    <div>
        <Button onClick={()=> handleClickOpen(props.user)} aria-label="delete user"
        sx={{color:grey[400]}}>
			Eliminar <DeleteIcon />
		</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Loading loading={load} background="#E3E5E9" loaderColor="#3363FF" />            
        <DialogTitle id="alert-dialog-title">
          {"Eliminar usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estas seguro que quieres eliminar al usuario:<br></br>
            {user.firstname + " " +user.lastname + " " +user.second_lastname}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onSubmit} autoFocus data-id={user.id}>
            Si, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
