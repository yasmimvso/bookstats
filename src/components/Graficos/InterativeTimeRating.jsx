import {Typography} from "@mui/material"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { BarChart } from '@mui/x-charts/BarChart';
import Services from '../../services/Service';

import { useState, useEffect } from 'react';

const barChartsParams = {
    // xAxis: [{ scaleType: 'band', data: [1, 2, 3] }],
    height: 400,

};

function InterativeTimeRating() {
    const [chartType, setChartType] = useState('bar');
    const [highlighted, setHighlighted] = useState('series');
    const [anos, setAnos] = useState(3);
    const [prevAnos, setPrevAnos] = useState('0')
    const [totalVistos, setTotalVistos] = useState([]);
    const [anosLabels, setAnosLabels] = useState([]);
    const [mediaVotos, setMediaVotos] = useState([]);
    const { dado, dadoSubject, dadoView, dadoValiable, getGeneral, getHome, getInterativeTime} = Services();

    useEffect(() => {
        if (anos !== prevAnos) {
            getInterativeTime();
        }

    }, [anos, getInterativeTime]);  
    
    useEffect(() => {
        if (dado.length > 0 && anos !== prevAnos) {
            console.log("DATA HERE:", dado);
            setPrevAnos(anos); 
    
            const anoAtual = new Date().getFullYear();

            var totalVistosPorAno = [];
            var mediaVotosPorAno = [];

            var totalVistoAno = 0
            var totalAverageRating = 0
            var anosParaLabels = [];

            for (let i = anos; i > 0; i--) {
                const ano = anoAtual - i - 4;
                anosParaLabels.push(ano);
                console.log("RESULTADO DO NAO:", anoAtual);
                dado.filter((item) => {
                    const itemAno = parseInt(item.volumeInfo.publishedDate.split('-')[0]);
                    console.log("ITEM A COMPARAR:", itemAno, ano);

                    if(itemAno == ano){
                        totalVistoAno += (parseInt(item.volumeInfo.ratingsCount) || 0)
                        totalAverageRating += ((parseInt(item.volumeInfo.averageRating) * parseInt(item.volumeInfo.averageRating) ) || 0 )
                    }
                    return itemAno === ano;
                });
                const mediaVotoAno = totalVistoAno > 0 ? totalAverageRating / totalVistoAno : 0;
                
                console.log("TOTAL VISTOS E MEDIA NO ANO", totalVistoAno, totalAverageRating, mediaVotoAno);
                totalVistosPorAno.push(totalVistoAno);
                mediaVotosPorAno.push(mediaVotoAno);
            }
    
            setTotalVistos(totalVistosPorAno);
            setMediaVotos(mediaVotosPorAno);
            setAnosLabels(anosParaLabels);
            // barChartsParams.xAxis[0].data = anosParaLabels;
    
            console.log("VALORES GERAIS DOS GRÁFICOS: ", totalVistosPorAno, mediaVotosPorAno, anosParaLabels);
        }
    }, [dado, anos, prevAnos, anosLabels]); 

    return (
        <Stack
            direction={{ xs: 'column', xl: 'row' }}
            spacing={1}
            sx={{ width: '45%', marginTop: '2%', marginBottom: '2%', border: '#ccc 1px solid', borderRadius:'5px'}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    aria-label="chart type"
                    fullWidth
                    sx={{alignItems:'center', justifyContent: 'center'}}
                >
                    <Typography variant="body2">
                        Relação de Avaliação e Visualização de Romances nos últimos anos
                    </Typography>
                </ToggleButtonGroup>
                {chartType === 'bar' && (
                    <BarChart
                        {...barChartsParams}
                        xAxis={[{ scaleType: 'band', data: Array.isArray(anosLabels) ? anosLabels : [] }]}
                        series={[
                            {
                                data: totalVistos,
                                label: 'Total Vistos',
                                highlightScope: { highlighted },
                            },
                            {
                                data: mediaVotos,
                                label: 'Média de Votos',
                                highlightScope: { highlighted },
                            }
                        ]}
                    />
                )}
            </Box>
            <Stack
                direction={{ xs: 'row', xl: 'column'}}
                spacing={3}
                justifyContent="center"
                useFlexGap
                sx={{pb: '2%'}}
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

export default InterativeTimeRating;
