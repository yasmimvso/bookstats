import { useState, useEffect } from 'react';

import Search from '../components/Search';
import Service from '../services/Service';
import Slides from '../components/Slides/Slides';

import { Typography, Container} from '@mui/material';
import Divider from '@mui/material/Divider';


// import PageOver from '../components/PageOver'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {

    const { dado, dadoSubject, dadoView, dadoValiable, getGeneral, getHome } = Service();

    const [query, setQuery] = useState('');
    const [homeLoad, setLoadHome] = useState(false);
    const [opSelected, setOption] = useState(0);
    const [opSelectedTemp, setOptionTemp] = useState(0);
    const [queryTemp, setQueryTemp] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    // const [open, setOpen] = useState(false);

    // // // Função para abrir o modal
    // const handleOpen = () => {
    //     console.log("aqui aqui")
    //     setOpen(true);
    //     console.log(open);
    // };

    // // Função para fechar o modal
    // const handleClose = () => {
    //     console.log("algum problemas")
    //     setOpen(false);
    // };

    // Efeito para carregar os dados iniciais quando a página é montada e `query` está vazio
    // useEffect(() => {
    //     if (!homeLoad) {
    //         setIsFetching(true);
    //         // getHome().then(() => {
    //         //     setIsFetching(false);
    //         //     setLoadHome(true);
    //         // });
    //     }
    // }, [query, getHome, isFetching, setLoadHome]);

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
                {homeLoad ?
                    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" mt={4}>Achados Mais Vistos</Typography>
                        <Slides dado={dadoView} isFetching={isFetching} />
                        <Typography variant="h6" mt={4}>Editoras de Sucesso</Typography>
                        <Slides dado={dadoSubject} isFetching={isFetching} />
                        <Typography variant="h6" mt={4}>Achados Mais Avaliados</Typography>
                        <Slides dado={dadoValiable} isFetching={isFetching} />
                    </Container>
                    :
                    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" mt={4}>Os melhores livros de {query}</Typography>
                        {/* <Button onClick={handleOpen} key={index} item={item.volumeInfo}>Clique aqui</Button>
                        <PageOver open={open} onClose={handleClose} /> */}
                        <Slides dado={dado} isFetching={isFetching} />
                    </Container>
                }
            </Container>
            <Divider sx={{ mt: 4 }} />
            <Typography variant="h5" mt={4}>Visualização Interativa de dados</Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/** Fazer as análises gráficas */}
            </Container>
        </Container>
    );
}

export default Home;
