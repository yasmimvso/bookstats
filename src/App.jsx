
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Layout from './components/Layout/Layout';
import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";

// instancionamento das rotas para navegação entre páginas
const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
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
