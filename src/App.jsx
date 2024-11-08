
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import {createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from "react-router-dom";

// instancionamento das rotas para navegação entre páginas
const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
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
