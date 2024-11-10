import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../components/Search';
import Service from '../services/Service';
import { Typography, Stack} from '@mui/material';

function Home() {
    const { dado, getGeneral } = Service();
    const [query, setQuery] = useState('');  
    const [queryTemp, setQueryTemp] = useState(''); // armazna ultima string de consulta
    const [isFetching, setIsFetching] = useState(false); 

    useEffect(() => {
        // lógica para resolver chamadas em loop de requisição
        // estou armazenando a ultima busca em uma variavel temp e comparando com a query
        if (query && (query!==queryTemp) && !isFetching) {
            setIsFetching(true); 
            getGeneral(query).then(() => {
                setIsFetching(false); 
                setQueryTemp(query); 
            });
        }
    }, [query, isFetching, queryTemp, getGeneral]);  

    function handleSearch(val) {
        setQuery(val);  
    }

    return (
        <div>
            <Search onSearch={handleSearch} />
            <div>
                <Typography className={styles.h1} varient='h4'>Teste de Home</Typography>
                <div>
                    <Stack direction="row" spacing={2}>
                        {dado.length > 0 ? (
                            dado.map((item, index) => (
                                <li key={index}>{item.volumeInfo.title}</li>
                            ))
                        ) : (
                           <p>chamar uma pagina em especifica</p>
                        )}
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Home;
