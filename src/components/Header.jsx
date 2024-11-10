import '../styles/Header.css';
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

    const toggleTheme = () => {
        setTheme(!theme);
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
                    <IconButton aria-label="Modo de visualização" color="inherit" onClick={toggleTheme}>
                        {theme ? <LightModeIcon /> : <ModeNightIcon />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
