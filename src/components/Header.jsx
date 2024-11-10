import '../styles/Header.css';
import logoIcon from "../assets/logo.png";
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { Typography,ToggleButton} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
function Header() {// desativas o erro do missing validation depois nos pacots
    const [theme, setTheme] = useState(false); // 'light' or 'dark'
    return (
        <div>
            <header className="header">
                <Typography variant='body1'>
                    <ul>
                        <li><Link to="/" >Inicio</Link></li> 
                        <li><Link to="/dashboard" >Dashboard</Link></li>
                    </ul>
                </Typography>
                <div className="mensage">
                    <div className="logo">
                        <img src={logoIcon} alt="logo"/>
                    </div>
                    <Typography variant='body1'>
                        Analise e Escolha seu próximo mundo particular
                    </Typography>
                    <ToggleButton aria-label='modo de visualização' size='small'>
                        {theme? <LightModeIcon/>:<ModeNightIcon/>}
                    </ToggleButton>
                </div>
             
            </header>
        </div>
        
    )
}

export default Header