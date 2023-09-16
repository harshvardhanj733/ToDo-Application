import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Signup from './Components/Signup'
import Login from './Components/Login'
import GetTodos from './Components/GetTodos'

function App() {

  // const [token, setToken] = useState("");

  return (
    <>
      <header>
        <Navbar/>
      </header>

      <BrowserRouter>

          <Routes>
              <Route exact path='/' element={<Dashboard></Dashboard>}/>
              <Route exact path='/signup' element={<Signup></Signup>}/>
              <Route exact path='/login' element={<Login></Login>}/>
              <Route exact path='/todos/dashboard' element={<GetTodos></GetTodos>}/>
          </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
