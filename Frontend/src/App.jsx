
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './Components/Navbar'
import Allroutes from './Components/Allroutes'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
  import { ToastContainer, toast } from 'react-toastify';

function App() {
  

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      <ToastContainer  />
      <Navbar/>
      <SearchBar/>
      <Allroutes/>
      <Footer/>
     

    </div>
  )
}

export default App
