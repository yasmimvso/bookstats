import { useState } from "react";
function Search(){
    const [inputValue, search] = useState('') // é assim que fazemos a atualização dos componentes
    // top-level declaration, tem sempre que ficar na parte mais alta da declaração do componente

    function changeValue(event){
     const value = event.target.value; 
     search(value);
        // let teste = document.getElementById('campo-busca');
        // teste.innerText = inputValue;
    }
    return (
        <div>
            <input type="text" placeholder="Procure por gênero, título.." className="busca" onChange={changeValue}/>
            {/**Colocar um icon de buca */}
            <h1 id="campo-busca">{inputValue}</h1>
        </div>
    )
}

export default Search;