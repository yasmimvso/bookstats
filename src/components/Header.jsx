import '../styles/Header.css';
import logoIcon from "../assets/logo.png";
import {Link} from 'react-router-dom'

function Header() {// desativas o erro do missing validation depois nos pacots
    return (
        <div>
            <header className="header">
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li> {/*Mudar para Icone */}
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </div>
            <div className="logo">
                <img src={logoIcon} alt="logo"/>
            </div>
            <div>
                Analise e Escolha seu próximo mundo particular
            </div>
            </header>
        </div>
        
    )
}

export default Header