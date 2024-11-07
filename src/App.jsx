
import Header from './components/Header'
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";

// instancionamento das rotas para navegação entre páginas
const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Header busca={true} />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>

  )
);

function App() {
 
  return (
    <RouterProvider router={browserRouter}/> 
  )
}

export default App
