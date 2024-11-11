import { Outlet } from "react-router-dom";
import Header from '../Header';
import { Container, Typography, Divider, Box } from "@mui/material";
// import "../../styles/Layout.css"
import logo from '../../assets/logo.png'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

function Layout() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Divider mt={4} mb={5} />
            <footer style={{maxHeight: 150,}}>
                <Container maxWidth="large" sx={{ display: 'inline-flex',padding: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%' }}>
                        <img src={logo} alt="Logo do Site" style={{ width: '20%', marginBottom: '5px' }} />
                        <Typography variant='body2' gutterBottom>Todos os direitos reservados © 2025</Typography>
                        <Typography variant='body2' color='textSecondary'>
                            <a href="/politica-de-privacidade">Política de Privacidade</a> |
                            <a href="/termos-de-uso">Termos de Uso</a>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '35%' }}>
                        <Typography variant="body1" color='textSecondary' mt={3}>Acompanhe as nossas redes</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <InstagramIcon />
                            <FacebookIcon />
                            <XIcon />
                        </Box>
                    </Box>
                </Container>
            </footer>

        </>

    )
}


export default Layout;