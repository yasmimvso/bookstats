import { useState, useEffect } from 'react';

import Search from '../components/Search';
import Service from '../services/Service';
import Slides from '../components/Slides/Slides';
import  InterativeTimeRating from '../components/Graficos/InterativeTimeRating';
// import InterativeSubject from '../components/Graficos/interativeSubject';
import { Typography, Container} from '@mui/material';
import Divider from '@mui/material/Divider';

// import PageOver from '../components/PageOver'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {

    const { dado,  getGeneral, getHome} = Service();

    const [query, setQuery] = useState('');
    const [homeLoad, setLoadHome] = useState(true);
    const [opSelected, setOption] = useState(0);
    const [opSelectedTemp, setOptionTemp] = useState(0);
    const [queryTemp, setQueryTemp] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [dataHome, setDataHome] = useState([]);

    // useEffect(() => {
    //     if (homeLoad) {
    //         getHome().then(response => {
    //             setDataHome(response);
    //             setLoadHome(false)
    //         });
    //     }
    // }, [homeLoad, getHome, setLoadHome]);

    // Efeito para realizar busca quando `query` muda ou uma nova opção é selecionada
    useEffect(() => {
        if (query && (query !== queryTemp || opSelected !== opSelectedTemp) && !isFetching) {
            setIsFetching(true);
            getGeneral(query, opSelected).then(() => {
                setIsFetching(false);
                setQueryTemp(query);
                setOptionTemp(opSelected);
            });
           
        }
    }, [query, opSelected, queryTemp, opSelectedTemp, getGeneral, isFetching]);

    function handleSearch(string, val) {
        setQuery(string);
        setOption(val);
    }

    return (
        <Container maxWidth="false" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Search onSearch={handleSearch} sx={{ alignItems: 'center', justifyContent: 'center' }} />
            <Divider />
            <Typography variant="h5" mt={4}>Categorias pensadas para você!</Typography>
            <Container maxWidth="xl" className="content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                { (!query)?
                    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" mt={4}>Achados e indicados</Typography>
                        <Slides dado={dataHome} isFetching={isFetching} />
                    </Container>
                    :
                    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" mt={4}>Os melhores livros de {query}</Typography>
                        <Slides dado={dado} isFetching={isFetching} />
                    </Container>
                }
            </Container>
            <Divider sx={{ mt: 4 }} />
            <Typography variant="h5" mt={4}>Visualização Interativa de dados</Typography>
            <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/** Fazer as análises gráficas */}
                <InterativeTimeRating/>
                <InterativeTimeRating/>
                {/* <InterativeSubject/> */}
            </Container>
        </Container>
    );
}

export default Home;
