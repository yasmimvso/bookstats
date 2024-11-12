import { useState } from "react";
import "../styles/Search.css";
import PropTypes from 'prop-types';
import { IconButton, TextField, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { ListItemText, ListItemButton, List } from '@mui/material';

function Search(props) {
    const [inputValue, setInputValue] = useState('');
    const [opSelection, setOpSelection] = useState(0); 
    const [primarySelect, setPrimarySelect] = useState('Filtro');
    const [open, setOpen] = useState(false);

    function toggleExpand() {
        setOpen(!open);
    }

    function handleInput(event) {
        let value = event.target.value.toLowerCase();
        setInputValue(value);
    }

    function handleClick() {
        {opSelection? props.onSearch(inputValue, opSelection): props.onSearch(inputValue, '')}
    }

    function handleOptionClick(optionVal, optionLabel) {
        setOpSelection(optionVal);
        setOpen(false); 
        setPrimarySelect(optionLabel)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); 
          handleClick();
        }
      };

    return (
        <Container className="content-stack" sx={{ position: 'relative' }}>
            <List sx={{ width: '20%', maxWidth: 360}} size='small'>
                <ListItemButton onClick={toggleExpand}>
                    <ListItemText primary={primarySelect} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {open && (
                    <List component="div" disablePadding sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 10, 
                        bgcolor: 'background.paper',
                        width: '100%', 
                    }}>
                       {/**Utilizei para fazer uma consulta mais epecificada. Ai filtro pelas condições que o API book permite */}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick(1, "Título")}>
                            <ListItemText primary="Título" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick(2, "Autor")}>
                            <ListItemText primary="Autor" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick(3, "Editora")}>
                            <ListItemText primary="Editora" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick(4, "Gênero" )}>
                            <ListItemText primary="Gênero" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleOptionClick(5, "ISBN" )}>
                            <ListItemText primary="ISBN" />
                        </ListItemButton>
                    </List>
                )}
            </List>
            <Container className="content-search">
                <TextField
                    size="small"
                    color='primary'
                    variant='standard'
                    type="text"
                    placeholder="O que você está procurando?"
                    className="search"
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    tabIndex="0"
                />
            </Container>
            <Container className="busca">
                <Tooltip title="Pesquisar">
                    <IconButton onClick={handleClick} aria-label='send' size='small'>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </Container>
        </Container>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
