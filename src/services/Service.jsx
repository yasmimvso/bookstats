// Service.jsx
import { useState } from 'react';
import httpClient from './baseAxio'; 

// Service para a consulta de livros

// fazer aquele processo de usar a string, procurar no geral, depois athor, depois editora.
// se for 
function Service() {
    // melhorar de modo que analisamos as regras particulares para cada consulta
    const [dado, setDado] = useState([]);
    const key = '&key=' + import.meta.env.VITE_API_KEY;

 
    const getGeneral = async (val) => {
        console.log('?q='+ val + key)
        try {
            const response = await httpClient.get('?q='+ val + key);
            setDado(response.data.items); 
            console.log("RESPONSE STATUS", response.status );
            console.log("DADO DE RETORNO: ", response.data.items);
        } catch (error) {
           alert('Error na consulta' + error);
        }
    };


    const getSubject = async (val) => {
        try {
            const response = await httpClient.get('subject:' + val + key);
            setDado(response.data.items);
        } catch (error) {
            alert('Error na consulta' + error);
        }
    };

    return { dado, getGeneral, getSubject }; 
    // estou retornando os dados como uma função javascript comum sem estruturação html
}

export default Service;