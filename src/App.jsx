import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Inicio from './views/inicio'
import Login from './components/login'
import Registre from './components/registre'
import Heading from './components/heading'
import Layaut from './components/layaut'
import Reserva from './components/reserva'
import Footer from './components/footer'
import Airline from './components/airline'
import Perfil from './components/perfil'

function App() {
  return (
    <>
      <Heading/>
      <Layaut>
        <Routes>
          <Route path='/' element={<Inicio/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registre' element={<Registre/>}></Route>
          <Route path='/reserva' element={<Reserva/>}></Route>
          <Route path='/airlines' element={<Airline/>}></Route>
          <Route path='/perfil' element={<Perfil/>}></Route>
        </Routes>
      </Layaut>
      <Footer/>
    </>
  )
}

export default App
