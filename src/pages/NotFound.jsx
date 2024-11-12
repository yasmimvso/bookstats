import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ 
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: 3,
                padding: 4,
                maxWidth: 400,
                width: '100%',
            }}>
                <Typography variant="h1" sx={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    marginBottom: 2,
                }}>
                    404
                </Typography>

                <Typography variant="body1" sx={{
                    fontSize: '1.25rem',
                    color: '#333',
                    marginBottom: 3,
                }}>
                    Página não encontrada
                </Typography>

                <Typography variant="body2" sx={{
                    color: '#555',
                    marginBottom: 4,
                }}>
                    Volte para a tela inicial
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{
                        backgroundColor: '#205f80',
                        color: 'white',
                        // '&:hover': {
                        //     backgroundColor: '#d50000',
                        // },
                        padding: '10px 20px',
                        textTransform: 'none',
                        borderRadius: '8px',
                    }}
                >
                    AQUI
                </Button>
            </Box>
        </Container>
    );
}

export default NotFound;
