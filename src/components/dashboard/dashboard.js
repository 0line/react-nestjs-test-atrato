import * as React from "react";
import CardUser from "../card/CardUser";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import NewUserModal from "../NewUserModal/newuser";
import { grey, blue } from '@mui/material/colors';
import { MenuItem } from "@mui/material";
import Loading from 'react-fullscreen-loading';
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      searchglobal:'',
      orderby:'id',
      orderdirection:'asc',
      page:1,
      limit:2

    };
  }

   componentDidMount(updateState) {
    this.setState({
        ...this.state,
        isLoaded: true,
        ...updateState
    },function() {
        fetch("http://localhost:5000/users?gsearch="
        +this.state['searchglobal']+'&page='+this.state['page']+
        '&orderby='+this.state['orderby']+'&orderdirection='
        +this.state['orderdirection']+"&limit="+this.state['limit'])
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                ...this.state,
                isLoaded: true,
                users: result.data.data
            });
            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
            console.log(error);
            this.setState({
                ...this.state,
                isLoaded: true,
                error
            });
            }
        ); 
    });
  }

    getUsers(){
      fetch("http://localhost:5000/users?gsearch=")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            users: result.data.data
          });
        },
        (error) => {
          console.log(error);
           this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, users } = this.state;
    console.log(isLoaded);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return  <Container fixed>
          <Box sx={{ display: 'flex',justifyContent: 'center', 
            alignItems: 'center', alignContent: 'center',height: '100vh'  }}>
              <CircularProgress /> 
          </Box>
        </Container>
    } else {
      return (
          <div>
              <Grid container spacing={2} px={4}>
                    <Grid item sm={6}>
                        <Grid container spacion={1} sm={12}>
                            <Grid item xs={12} sm={6}>
                                <Grid
                                    pt={4}
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 1, width: '85%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField id="outlined-basic" label="Buscar" variant="outlined" 
                                    onChange={(e)=>{
                                        this.componentDidMount({searchglobal:e.target.value})}}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid
                                    pt={4}
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 1, width: '85%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField pt={4} id="select" label="ORDENAR" value={this.state['orderby']+","+this.state['orderdirection']} select
                                    onChange={(e)=>{
                                        console.log(e.target.value);
                                        const orden= e.target.value.split(',');
                                    this.componentDidMount({orderby:orden[0],rderdirection:orden[1]})}}>
                                        <MenuItem value="id,asc">ID,ASC</MenuItem>
                                        <MenuItem value="id,desc">ID,DESC</MenuItem>
                                        <MenuItem value="status,asc">STATUS,ASC</MenuItem>
                                        <MenuItem value="status,desc">STATUS,DESC</MenuItem>
                                        <MenuItem value="firtsname,asc">NOMBRE,ASC</MenuItem>
                                        <MenuItem value="firtsname,desc">NOMBRE,DESC</MenuItem>
                                        <MenuItem value="lastname,asc">APELLIDO PATERNO,ASC</MenuItem>
                                        <MenuItem value="lastname,desc">APELLIDO PATERNO,DESC</MenuItem>
                                        <MenuItem value="second_lastname,asc">APELLIDO MATERNO,ASC</MenuItem>
                                        <MenuItem value="second_lastname,desc">APELLIDO MATERNO,DESC</MenuItem>
                                    </TextField>
                                </Grid>
                                
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid
                                    pt={4}
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 1, width: '85%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField pt={4} id="select" label="Tarjetas por página" value={this.state['limit']} select
                                    onChange={(e)=>{
                                    this.componentDidMount({limit:e.target.value})}}>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="20">20</MenuItem>
                                    </TextField>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container spacion={1} sm={12}> 
                            <Grid p={4} item xs={12} sm={3}> 
                               <NewUserModal text="Nuevo Usuario"></NewUserModal>
                            </Grid>
                        </Grid>
                    </Grid>
              </Grid>
      <Grid container spacing={2} px={8} py={4}>
        {users.map(user => (
            <Grid item sm={6}>
                <CardUser user={user}></CardUser>
            </Grid>
        ))}
      </Grid>
      </div>
      );
    }
  }
}