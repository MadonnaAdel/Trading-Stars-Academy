
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './UserPages/home'
import SignUp from './UserPages/signUp/SignUp'
import SignIn from './UserPages/signIn/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>

    </>

    
  )
}

export default App
