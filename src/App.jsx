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
import MyCourses from './AdminPages/adminCourses/myCourses'
import Candidate from './UserPages/AuthPages/candidate'
import SendMailForRestNewPass from './UserPages/AuthPages/SendMailForRestNewPass'
import SetNewPass from './UserPages/AuthPages/SetNewPass'
import SubscriptionRequests from './AdminPages/SubscriptionRequests'

import ApprovedUsers from './AdminPages/ApprovedUsers'
import RejectedUsers from './AdminPages/RejectedUsers'
import AdminSettings from './AdminPages/AdminSettings'
import JoinRequests from './AdminPages/JoinRequests'
import PaymentsMethods from './UserPages/paymentsMethods'
import UserCourses from './UserPages/UserCourses'
import MangeCategories from './AdminPages/mangeCategories'
import DisplayCandidates from './AdminPages/displayCandidates'
import ContactUs from './UserPages/contactUs'
import AdminGuards from './AdminPages/AdminGurds'

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/forget" element={<SendMailForRestNewPass />} />
            <Route path="/forget-password" element={<SetNewPass />} />
            <Route path="/customer-service" element={<ContactUs />} />
            {/* Protected Route */}
            <Route path="/payment-methods" element={<PrivateRoute element={<PaymentsMethods />} />} />
            <Route path="/courses" element={<PrivateRoute element={<Courses />}/>} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/my-courses" element={<PrivateRoute element={<UserCourses />} />} />
            <Route path="/course-details/:id" element={<PrivateRoute element={<CourseDetails />} />} />
          </Route>
          <Route path="/dashboard" element={<AdminGuards element={<DashboardLayout />} />}>
            <Route index element={<MangeCategories />} />
            <Route path="subscription-requests" element={<SubscriptionRequests />} />
            <Route path="courses/:id" element={<MyCourses />} />
            <Route path="join-requests" element={<JoinRequests />} />
            <Route path="candidates" element={<DisplayCandidates />} />
            <Route path="approved-users" element={<ApprovedUsers />} />
            <Route path="rejected-users" element={<RejectedUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
