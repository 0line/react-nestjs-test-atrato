import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import { grey, blue } from '@mui/material/colors';
import FaceIcon from '@mui/icons-material/Face';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './carduser.css';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import UserEditModal from "../UserEditModal/UserEditModal";
import moment from "moment";
import DeleteUser from "../DeleteUserModal/deleteusermodal";

export default function CardUser(props) {
	const user= props.user;
	const updateUsers = props.updateUsers;
	const [status, setStatus] = React.useState(user.status);

	const handleChange = (event) => {
		setStatus(event.target.value);
		UpdateStatus({id:user.id ,status:event.target.value})
	};

	const UpdateStatus= (data) => {
    fetch("http://localhost:5000/users/"+data.id,
	{
		method:'PUT',
		body: JSON.stringify({status:data.status}),
		headers:{
			'Content-Type': 'application/json'
		}

	})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
      )
  }

	
	return (
		<Card sx={{ maxWidth: 100+'%', p:3, height: {xs:"500px" ,sm:"450px"} }}>
			<div className="header-card">
				<Box component="div" sx={{display: 'flex', flexDirection: 'row', 
				justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center'}}>
					<Avatar sx={{display: { xs: 'none', sm: 'flex' }, bgcolor: grey[100]}} aria-label="recipe">
						<FaceIcon sx={{ color: grey[500], width: 100+'%', height: 100+'%' }} />
					</Avatar>
					<Box component="div" sx={{p:{xs:0, sm:2}, display: 'flex', flexDirection: 'column', 
						justifyContent: {xs:'flex-start',sm:'flex-start'}, 
						alignContent: {xs:'flex-start',sm:'flex-start'}, 
						alignItems: {xs:'flex-start',sm:'flex-start'}}}>
						<Typography variant="h6" sx={{m:0}} display="block" gutterBottom component="div">
							{user.firstname + " " +user.lastname + " " +user.second_lastname}
						</Typography>
						<Typography variant="caption" display="block" gutterBottom sx={{m:0}} 
						color="text.secondary">
							<b>ID: </b><span>{user.id}</span>
						</Typography>
					</Box>
				</Box>
				<Box component="div" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
					<FormControl sx={{display: { xs: 'none', sm: 'block' },
					width: '100%', minWidth: '100%', color: blue[800], borderColor: 'blue.800'}}>
							<InputLabel id="status-select-label" sx={{color: blue[800]}}>
								Status
							</InputLabel>
							<Select
							labelId="status-select-label"
							id="status-user"
							value={status}
							label="Status"
							onChange={handleChange}
							displayEmpty
							name="status"
							sx={{width: '100%' , minWidth: 100, color: blue[800] }}
							>
							<MenuItem value={"pendiente"}>PENDIENTE</MenuItem>
							<MenuItem value={"en proceso"}>EN PROCESO</MenuItem>
							<MenuItem value={"completado"}>COMPLETADO</MenuItem>
							</Select>
					</FormControl>
					<UserEditModal user={user} sx={{display: { xs: 'block', sm: 'none' }, color:grey[400]}}></UserEditModal>
				</Box>
			</div>
			<CardContent>
				<Grid container  sx={{display: 'flex', flexDirection: {xs:'column', sm: 'row'}, 
				justifyContent: {xs:'center' ,sx:'center'}, 
				alignItems: {xs:'center' ,sx:'center'}}}>
						<Grid xs={0} md={6} sx={{display: 'flex', 
						flexDirection: 'column', justifyContent: {xs:'center' ,sx:'center'}, 
						alignItems: {xs:'flex-start' ,sx:'flex-start'},
						borderRight: {xs:0, sm:1}}}>
							<Box component="div" sx={{p:1, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent:'flex-start', 
								alignItems: 'flex-start'}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									EMAIL
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{user.email}
								</Typography>
							</Box>
							<Box component="div" sx={{p:1, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent:'flex-start', 
								alignItems: 'flex-start'}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									FECHA DE NACIMIENTO
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{moment(user.birthday).format("DD/MM/YYYY")} 
								</Typography>
							</Box>
							<Box component="div" sx={{p:1, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent:'flex-start', 
								alignItems: 'flex-start'}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									TELÉFONO
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{user.phone}
								</Typography>
							</Box>
							<Box component="div" sx={{p:1, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent:'flex-start', 
								alignItems: 'flex-start'}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									ANALISTA ASIGNADO
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{user.analyst}
								</Typography>
							</Box>
						</Grid>
						<Grid xs={0} sm={5} sx={{
							 bgcolor: grey[200], borderRadius: 1,
							 height:'100%', minHeight:'100%', p:{xs:0, sm:3}, 
							 ml:{xs:0, sm:2},
							 display:{xs:'none', sm:'block'}}}>
							<Box component="div" sx={{p:2, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent: 'center', 
								alignItems: 'center',
								mx:{xs:0, sm:2}}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									FULL NAME
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{user.firstname + " " +user.lastname + " " +user.second_lastname}
								</Typography>
							</Box>
							<Box component="div" sx={{p:2, display: 'flex', flexDirection: 'column', 
								justifyContent: 'space-evenly', 
								alignContent: 'center', 
								alignItems: 'center',
								mx:{xs:0, sm:2}}}>
								<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
									CARD NUMBER
								</Typography>
								<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
									{user.ncard}
								</Typography>
							</Box>
							<Box component="div" sx={{p:1, display: 'flex', flexDirection: 'row', 
								justifyContent: 'space-evenly', 
								alignContent: 'center', 
								alignItems: 'center',
								mx:{xs:0, sm:2}}}>
								<Box>
									<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
										CVV
									</Typography>
									<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
										{user.cvv}
									</Typography>
								</Box>
								<Box>
									<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
										PIN
									</Typography>
									<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
										{user.pin}
									</Typography>
								</Box>
								<Box>
									<Typography variant="caption" sx={{m:{xs:0, sm:0}, letterSpacing: 4}} display="block" gutterBottom component="div">
										EXP
									</Typography>
									<Typography display="block" gutterBottom sx={{m:{xs:0, sm:0},  fontWeight: 'bold'}} color="text.secondary">
										{moment(user.expirationdate).format("MM/YYYY")} 
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
			</CardContent>
			<CardActions disableSpacing sx={{
				display: { xs: 'block', sm: 'flex' },
				justifyContent: {xs:'center', sm:'flex-end'}, 
				alignContent: {xs:'center', sm:'flex-end'}, 
				alignItems: {xs:'center', sm:'flex-end'}
			}}>
				<FormControl sx={{display: { xs: 'block', sm: 'none' },
					width: 200, minWidth: 200, color: blue[800], borderColor: 'blue.800',
					}}>
							<InputLabel id="status-select-label" sx={{color: blue[800]}}>
								Status
							</InputLabel>
							<Select
							labelId="status-select-label"
							id="status-user"
							value={status}
							label="Status"
							onChange={handleChange}
							displayEmpty
							sx={{width: '100%' , minWidth: 100, color: blue[800] }}
							>
							<MenuItem value={"pendiente"}>PENDIENTE</MenuItem>
							<MenuItem value={"en proceso"}>EN PROCESO</MenuItem>
							<MenuItem value={"completado"}>COMPLETADO</MenuItem>
							</Select>
				</FormControl>
				<DeleteUser user={user} updateUsers={updateUsers}></DeleteUser>
				<UserEditModal user={user} sx={{display: { xs: 'none', sm: 'flex' }, color:grey[600], mr:10}} text="editar"></UserEditModal>
			</CardActions>
		</Card>
	);
}
