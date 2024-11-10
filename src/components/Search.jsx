import { useState } from "react";
import "../styles/Search.css";
import PropTypes from 'prop-types';
import { Button, Stack, IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
function Search(props) {
    const [inputValue, search] = useState('');
   
    // esta função é chamada toda vez que o usuárui digita. Ele atualiza a variável gloval de Search inputValue
    function handleInput(event) {
        let value = event.target.value.toLowerCase();  // estou convertendo tudo para minusculo para seguir um padrão
        search(value);  // usando a hook useState atualizo inputValue
    }

    // só será realizada a consulta assim que clicar no icone pesquisa
    function handleClick() {
        props.onSearch(inputValue); // funcao prop se Search, estou passando inputValue o que vai poder ser cosnultada
    }

    return (
        <div className="content-stack">
            <div className="content-search">
                <TextField
                    size="small"
                    color='primary'
                    variant='standard'
                    type="text" 
                    placeholder="Busque por gênero, título, ISBN.." 
                    className="search" 
                    value={inputValue} // Associar o estado com o valor do input
                    onChange={handleInput} // Chama a função de mudança no valor
                />
            </div>
            <div className="busca">
                <IconButton onClick={handleClick} aria-label='send' size='small' color='secundary'>
                    <SearchIcon/>
                </IconButton>
            </div>
        </div>
    );
}

// usei para tirar o erro de tipificação dos props
Search.PropTypes = {
    onSearch: PropTypes.func.isRequired, // é requerid pq preciso da função para passar a string de busca
}

export default Search;
