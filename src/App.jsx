import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './UserPages/home'
import SignUp from './UserPages/AuthPages/SignUp'
import SignIn from './UserPages/AuthPages/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Courses from './UserPages/courses'
import Layout from './sharedComponents/layout'
import CourseDetails from './UserPages/courseDetails'
import { AuthProvider } from './context/authContext' 
import Settings from './UserPages/settings/Settings'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PrivateRoute from '../PrivateRoute'
import DashboardLayout from './AdminPages/DashboardLayout'
import Dashboard from './AdminPages/dashBoard'
import Candidate from './UserPages/AuthPages/candidate'
import SendMailForRestNewPass from './UserPages/AuthPages/SendMailForRestNewPass'
import SetNewPass from './UserPages/AuthPages/SetNewPass'
function App() {
  return (
    <AuthProvider>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/forget" element={<SendMailForRestNewPass />} />
          <Route path="/forget-password" element={<SetNewPass />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/course-details/:id" element={<PrivateRoute element={<CourseDetails />} />} />
        </Route>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
