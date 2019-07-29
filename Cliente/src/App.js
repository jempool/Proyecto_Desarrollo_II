import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";


export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          {/* --- Enlace a la ruta de la pagina de bienvenida --- */}
          <TypoGraphy variant="h6" >
            [ <Link to={`/home/`} style={{ textDecoration: 'none', color: 'white' }}> Home</Link>]
          </TypoGraphy>

          {/* --- Enlace a la ruta para el login --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/login/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Login</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta para el registro de los usuarios --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/Sign_up/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Sign up</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta a la pagina del administrador --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/admin_page/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Admin page</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta a la pagina del usuario --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/user_page/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; User page</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta a la pagina de los productos --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/products/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Products</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta a la pagina de las categorias --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/categories/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Categories</Link>
          </TypoGraphy>

          {/* --- Enlace a la ruta a la pagina de las subcategorias --- */}
          <TypoGraphy variant="h6" >
            <Link
              to={`/subcategories/`}
              style={{ textDecoration: 'none', color: 'white' }}>
              &nbsp; &nbsp; &nbsp; Subcategories</Link>
          </TypoGraphy>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}
