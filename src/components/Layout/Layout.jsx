import {  Outlet } from "react-router-dom";
import Header from '../Header';
import "../../styles/Layout.css"

function Layout(){
    return(
        <>
        <Header/>
        <main className="main-content">
         <Outlet />
        </main>
        <footer>Faça de seu 2025 um ano de mais conhecimento e aventura</footer>
        </>

    )
}


export default Layout;