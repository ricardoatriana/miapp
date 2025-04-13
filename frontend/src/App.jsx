import { BrowserRouter, Route, Routes } from 'react-router-dom'; {/*React router library*/ }
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Admin/AdminLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App = () => {
  return (
    <BrowserRouter> {/*enable client side routing, each route is handle in the browser rather than in the server*/}

      <Routes>
        <Route path="/" element={<UserLayout />}>
        {/* Nested Routes */}
        <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
    
          
        </Route>

        {/* Admin Layout*/}
        <Route path="/admin" element={<AdminLayout />}>
            
        </Route>
          
      </Routes>
    
    </BrowserRouter>
        
      );
};

export default App;