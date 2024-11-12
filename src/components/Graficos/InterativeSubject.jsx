
import { useState, useEffect } from "react";


import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Service from '../../services/Service'
import { IndeterminateCheckBox } from "@mui/icons-material";

const barChartsParams = {
    margin: { top: 10, right: 10 },
    sx: {
        [`& .${legendClasses.root}`]: {
            display: 'none',
        },
    },
    height: 300,
};

function InterativeSubject() {
    const [xHighlight, setXHightlight] = useState('band');
    const [yHighlight, setYHightlight] = useState('none');
    const [anos, setAnos] = useState(3);
    const [prevAnos, setPrevAnos] = useState('0')
    const [anosLabels, setAnosLabels] = useState([]);
    const [series, setSeries] = useState([]);
 

    const { dado,  getInterativesSubject} = Service();

    function contarLivrosPorCategoriaPorAno(dados) {
        const livrosPorAno = {};
    
        dados.forEach(item => {
            if (item?.volumeInfo?.categories && Array.isArray(item.volumeInfo.categories)) {
                const ano = parseInt(item.volumeInfo.publishedDate.split('-')[0]);
                item.volumeInfo.categories.forEach(categoria => {
                    if (!livrosPorAno[ano]) {
                        livrosPorAno[ano] = {};
                    }
                    if (!livrosPorAno[ano][categoria]) {
                        livrosPorAno[ano][categoria] = 0;
                    }
                    livrosPorAno[ano][categoria] += 1;
                });
            }
        });

        console.log("TOTAL DE LIVROS POR ANO", livrosPorAno);
    
        return livrosPorAno;
    }
    
    function getAnosSelecionados(anosSelecionados) {
        const anoAtual = new Date().getFullYear();
        let anos = [];
        for (let i = anosSelecionados; i > 0; i--) {
            anos.push(parseInt(anoAtual - i));
        }
        return anos;
    }
    
    useEffect(() => {
        if (anos !== prevAnos) {
            getInterativesSubject();
        }
    }, [anos, getInterativesSubject]);
    
    useEffect(() => {
        const anosSelecionados = getAnosSelecionados(anos);
        setAnosLabels(anosSelecionados);
    
        if (dado.length > 0 && (anos !== prevAnos)) {
            console.log("DATA HERE SUBJECT:", dado);
            setPrevAnos(anos); 
    
            console.log("APOS SETAR DADOS DE ANO: ", anos, prevAnos);
            
            const livrosPorAno = contarLivrosPorCategoriaPorAno(dado);
            const anosSelecionados = getAnosSelecionados(anos);
            const categorias = Object.keys(livrosPorAno);
            
            console.log("CATEGORIAS e ANOS SELECIONADOS:", categorias, anosSelecionados);
            
            let categoriasDeLivrosPorAno = {};
            
            anosSelecionados.forEach((ano, index) => {
                categorias.forEach((categoria, index2) => {
                    const totalCategoriaPorAno = livrosPorAno[String(ano)] ? livrosPorAno[String(ano)][categoria] || 0 : 0;
                    console.log("TOTAL CATEGORIA", categoria, "ANO", ano, ":", totalCategoriaPorAno, "INDEX", index, "INDEX2", index2, "??", livrosPorAno[categoria]);
                    categoriasDeLivrosPorAno[categoria][index] = totalCategoriaPorAno;
                });
            });

            console.log("RESULTADO DE DADOS", categoriasDeLivrosPorAno)
            let seriesData = [];
            Object.keys(categoriasDeLivrosPorAno).forEach(categoria => {
                seriesData.push({
                    data: categoriasDeLivrosPorAno[categoria],
                    stack: '1',
                    label: categoria
                });
            });
    
            setSeries(seriesData);
        }
    }, [anos, dado]); 
    
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', m: 2 }}>
            <div style={{ flexGrow: 1 }}>
                <BarChart
                    {...barChartsParams}
                    xAxis={[{ scaleType: 'band', data: anosLabels }]}
                    series={series}
                    axisHighlight={{ x: xHighlight, y: yHighlight }}
                />
            </div>
            <Stack
                direction={{ xs: 'row', xl: 'column' }}
                spacing={3}
                justifyContent="center"
                useFlexGap
                sx={{ pb: '2%' }}
            >
                <TextField
                    select
                    label="Últimos"
                    value={anos}
                    onChange={(event) => setAnos(parseInt(event.target.value))}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value={3}>3 anos</MenuItem>
                    <MenuItem value={5}>5 anos</MenuItem>
                    <MenuItem value={10}>10 anos</MenuItem>
                </TextField>
            </Stack>
        </Stack>
    );
}

export default InterativeSubject;
