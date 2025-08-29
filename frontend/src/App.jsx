import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Verify from './pages/Verify'
import { UserData } from './context/userContext'

const App = () => {
  const {user, isAuth, loading} = UserData();
  return (
    <>
    {loading?<h1 className='text-3xl text-white'>Loading...</h1>:<BrowserRouter>
    <Routes>
      <Route path='/' element={isAuth ? <Home/> : <Login/>} />
      <Route path='/login' element={isAuth ? <Home/>:<Login/>} />
      <Route path='/verify' element={isAuth ? <Home/>:<Verify/>} />
    </Routes>
    </BrowserRouter>}
    </>
  )
}

export default App