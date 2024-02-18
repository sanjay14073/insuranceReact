import React,{ useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import Details from './pages/details';
import InsuranceLogin from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path='/' element={<InsuranceLogin/>}></Route>
      <Route path='/home/:id' element={<Home/>}></Route>
      <Route path='/:id' element={<Details/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
