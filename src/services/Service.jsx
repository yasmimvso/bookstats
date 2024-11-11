import { useState } from 'react';
import httpClient from './baseAxio';

function Service() {
    const [dado, setDado] = useState([]);
    const [dadoView, setDadoView] = useState([]);
    const [dadoSubject, setDadoSubject] = useState([]);
    const [dadoValiable, setDadoValiable] = useState([]);
    const [tipo, setTipo] = useState('');

    const key = '&key=' + import.meta.env.VITE_API_KEY;

    const dataMostViewed = (dado) => {

        const result = dado
            .filter(item => item.volumeInfo && item.volumeInfo.ratingsCount > 50)
            .sort((a, b) => parseInt(b.volumeInfo.ratingsCount) - parseInt(a.volumeInfo.ratingsCount))
            .slice(0, 10);

        console.log("DADOS MOST VIEWD", result);
        setDadoView(result);
    };

    const dataMostAvaliable = (dado) => {
        const result = dado
            .filter(item => item.volumeInfo && item.volumeInfo.averageRating > 4.3)
            .sort((a, b) => parseInt(b.volumeInfo.averageRating) - parseInt(a.volumeInfo.averageRating))
            .slice(0, 10);

        console.log("DADOS MOST AVALIABLE", result);
        setDadoValiable(result);
    };

    const dataSubject = (dado) => {
        const publishers = new Set();
        const result = dado
            .filter(item => item.volumeInfo && item.volumeInfo.publisher)
            .filter(item => {
                const isUnique = !publishers.has(item.volumeInfo.publisher);
                if (isUnique) publishers.add(item.volumeInfo.publisher);
                return isUnique;
            })
            .slice(0, 10);
        console.log("DADOS DATA SUBJECT", result);
        setDadoSubject(result);
    };

    const getGeneral = async (string, val) => {
        console.log("Valor selecionado:", val);

        if (val) {
            if (val === 1) {
                setTipo('intitle:');
            } else if (val === 2) {
                setTipo('inauthor:');
            } else if (val === 3) {
                setTipo('inpublisher:');
            } else if (val === 4) {
                setTipo('subject:');
            } else {
                setTipo('isbn:');
            }

            const query = `?q=${tipo}${string}${key}`;

            try {
                const response = await httpClient.get(query);
                setDado(response.data.items);
                console.log("RESPONSE STATUS", response.status);
                console.log("DADO DE RETORNO: ", response.data.items);
            } catch (error) {
                console.error('Error na consulta: ', error.response);
            }
        } else {
            const query = `?q=${string}${key}`;
            console.log("Query gerada (sem filtro): ", query);

            try {
                const response = await httpClient.get(query);
                setDado(response.data.items);
                console.log("RESPONSE STATUS", response.status);
                console.log("DADO DE RETORNO: ", response.data.items);
            } catch (error) {
                console.error('Error na consulta: ', error.response);
            }
        }
    };

    const getHome = async () => {
        try {
            const response = await httpClient.get(`?q=all${key}`);

            dataMostViewed(response.data.items);
            dataSubject(response.data.items);
            dataMostAvaliable(response.data.items);
        } catch (err) {
            console.log(err);
        }
    };

    const getInterativeTime = async () => {
        try {
            const response = await httpClient.get(`?q=romance${key}`);

            setDado(response.data.items)

            console.log("DATA", response.data.items);
        } catch (err) {
            console.log(err);
        }
    }

    return { dado, dadoSubject, dadoView, dadoValiable, getGeneral, getHome, getInterativeTime};
}

export default Service;
