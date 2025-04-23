import { BrowserRouter, Route, Routes } from 'react-router-dom'; {/*React router library*/ }
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from '../pages/AdminHomePage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import CartDrawer from '../pages/CartDrawer';

const App = () => {
  return (
    <BrowserRouter> {/*enable client side routing, each route is handle in the browser rather than in the server*/}

      <Routes>
        <Route path="/" element={<UserLayout />}>
        {/* Nested Routes */}
        <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<CartDrawer />} />
    
        </Route>

        {/* Admin Layout*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={ <AdminHomePage />} />
        </Route>
          
      </Routes>
    
    </BrowserRouter>
        
      );
};

export default App;