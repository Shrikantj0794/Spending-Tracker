
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../src/main_pages/Login'
import Register from '../src/main_pages/Register'
import Home from '../src/main_pages/Home'


const App: React.FC = () => {
  return (

        <BrowserRouter>
      <Routes>
        
         
          <Route path='/' Component={Home}></Route>
          <Route path='/login' Component={Login}></Route>
        
        <Route path='/register' Component={Register}></Route>
      </Routes>
      </BrowserRouter>
        
  )
}

export default App
