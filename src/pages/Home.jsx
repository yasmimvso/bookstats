import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../components/Search';
import Service from '../services/Service';
import Slides from '../components/Slides/Slides'

import { Typography, Container} from '@mui/material';
import Divider from '@mui/material/Divider';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Home() {

    const { dado, getGeneral } = Service();
    const [query, setQuery] = useState('');
    const [opSelected, setOption] = useState(1);
    const [queryTemp, setQueryTemp] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (query && (query !== queryTemp) && !isFetching) {
            setIsFetching(true);
            getGeneral(query, opSelected).then(() => {
                setIsFetching(false);
                setQueryTemp(query);
            });
        }
    }, [query, isFetching, queryTemp, getGeneral, opSelected]);

    function handleSearch(string, val) {
        setQuery(string);
        setOption(val);
    }

    return (
        <Container maxWidth="false">
            <Search onSearch={handleSearch} />
            <Divider />
            <Typography variant="h5" mt={4} >Categorias pensadas para você!</Typography>
            <Container maxWidth="xl" className="content">
                <Container maxWidth="lg" sx={{ wrap: 'nowrap' }}>
                     {/** Colocar uma condição, se não foi pesquiaado nada temos um tipo de consulta, se foi pesquisado ai temos outro tipo*/}
                    <Typography variant="h6" mt={4}>Achados Mais Vendidos</Typography>
                    <Slides dado={dado} isFetching={isFetching}/>
                    {/* <Typography variant="h6" mt={4}>Editoras de Sucesso</Typography>
                    <Slides dado={dado} isFetching={isFetching}/> */}
                    <Typography variant="h6" mt={4}>Achados Mais Avaliados</Typography>
                    <Slides dado={dado} isFetching={isFetching} />
                </Container>
            </Container>
        </Container>
    );
}

export default Home;
