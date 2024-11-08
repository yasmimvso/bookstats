import { useState } from "react";
import "../styles/Search.css"
function Search(){
    const [inputValue, search] = useState('') // é assim que fazemos a atualização dos componentes
    console.log(inputValue);
    // top-level declaration, tem sempre que ficar na parte mais alta da declaração do componente
  

    // tem que fazer a lógica de busca aqui. Como os outros dados vão ter acesso ao resultado?
    function changeValue(event){
     const value = event.target.value; 
     search(value);
    }

    return (
        <div className="content-search">
            <input type="text" placeholder="Busque por gênero, título, ISBN.." className="search" onChange={changeValue}/>
        </div>
    )
}

export default Search;