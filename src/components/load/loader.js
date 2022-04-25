import { Container, Box, CircularProgress } from "@mui/material";

export function Loader() {
    
    return(
        <Container fixed>
          <Box sx={{ display: 'flex',justifyContent: 'center', 
            alignItems: 'center', alignContent: 'center',height: '100vh'  }}>
              <CircularProgress /> 
          </Box>
        </Container>
    );
}