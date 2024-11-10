import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../components/Search';
import Service from '../services/Service';
import { Typography, Container, Skeleton, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';
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
            <Typography className={styles.h1} variant="h5">Categorias pensado em você!</Typography>
            <Container maxWidth="xl" className="content">
                <Container maxWidth="lg" sx={{ wrap: 'nowrap' }}>
                    <Typography className={styles.h1} variant="h6">Achados Mais Vendidos</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, overflow: 'hidden' }}>
                        {(isFetching ? Array.from(new Array(dado.length)) : dado).map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: '19%',
                                    minWidth: 210,
                                    height: 340,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {isFetching || (!item) ? (
                                    <Skeleton variant="rectangular" width={210} height={280} />
                                ) : (
                                    <img
                                       className={styles.imgBooks}
                                        alt={item.volumeInfo.title}
                                        src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null}
                                        onClick={()=>{console.log("colocar funão para abrir uma tla sobre  trazer mais informaçõe")}}
                                    />
                                )}
                                <Box sx={{ pr: 2, mt: 1 }}> {/**pr padding-right e mt margin top */}
                                    {isFetching || (!item) ? (
                                        <>
                                            {/* <Skeleton width="100%" /> */}
                                        </>
                                    ) : (
                                        <>
                                            <Typography gutterBottom variant="body2">
                                                {item.volumeInfo.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ display: 'block', color: 'text.secondary' }}
                                            >
                                                <>
                                                    {Array.isArray(item.volumeInfo.authors)
                                                        ? item.volumeInfo.authors.length > 1
                                                            ? item.volumeInfo.authors.join(', ')
                                                            : item.volumeInfo.authors
                                                        : item.volumeInfo.authors || 'Autor desconhecido'}
                                                </>
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Container>
        </Container>
    );
}

export default Home;
