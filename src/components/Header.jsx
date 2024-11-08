import '../styles/Header.css';
import logoIcon from "../assets/logo.png";
import PropTypes from 'prop-types';

function Header() {// desativas o erro do missing validation depois nos pacots
    return (
        <div>
            <header className="header">
            <div>
                <ul>
                    <li><a href="/">Home</a></li> {/*Mudar para Icone */}
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

Header.PropTypes = {
    busca: PropTypes.bool.isRequired
}

export default Header