import '../styles/Header.css';
import '../styles/index.css'
import logoIcon from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Typography, IconButton, Box, AppBar, Toolbar} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

function Header() {
    const [theme, setTheme] = useState(false);
    
    // funcionalidades para mudança de modo de visualização escuro
    // ainda estou trabalhando nele
    
    const setDarkMode = () => {
        document.body.setAttribute("data-theme", "dark");
    };
    
    const setLightMode = () => {
        document.body.setAttribute("data-theme", "light");
    };
    
    const toggleTheme = () => {
        setTheme(!theme);
        if (theme) setLightMode();
        else setDarkMode();
    };
    

    return (
        <AppBar position="fixed" color="inherit" className="header">
            <Toolbar>
                <Box display="flex" alignItems="center" ml={2} flexGrow={1}>
                    <Link to="/">
                        <img src={logoIcon} alt="logo" className="logo" />
                    </Link>
                    <Typography variant="body1" ml={2}>
                        Analise e Escolha seu próximo mundo particular
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mr={2}>
                    <Tooltip title="Página de Dashboards">
                        <Link to="/dashboard">
                            <IconButton aria-label="Página de Dados" color="inherit">
                                <AnalyticsIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Modo Noturno">
                        <IconButton aria-label="Modo Noturno" color="inherit" onClick={toggleTheme}>
                            {theme ? <LightModeIcon /> : <ModeNightIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
