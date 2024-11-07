import '../styles/Header.css';
import Search from './Search';
import logoIcon from "../assets/logo.png"
import PropTypes from 'prop-types';

function Header(props) {
    const busca = props.busca; // desativas o erro do missing validation depois nos pacots
    return (
        <div>
            <header className="header">
            <div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Acessar</a></li> {/*#tela cadastro / entrar (so mostra se não tiver logado)*/}
                </ul>
            </div>
            <div className="logo">
                <img src={logoIcon} alt="logo" />
            </div>
            <div>
                {/* // <!--colocar rdes sociais--> */}
            </div>
            </header>
            {busca? <Search /> : null}{/*#componente de busca*/}
        </div>
        
    )
}

Header.PropTypes = {
    busca: PropTypes.bool.isRequired
}

export default Header