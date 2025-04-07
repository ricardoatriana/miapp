import { BrowserRouter, Route, Routes } from 'react-router-dom'; {/*React router library*/ }
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Admin/AdminLayout';

const App = () => {
  return (
    <BrowserRouter> {/*enable client side routing, each route is handle in the browser rather than in the server*/}

      <Routes>
        <Route path="/" element={<UserLayout />}>
       
    
          
        </Route>

        {/* Admin Layout*/}
        <Route path="/admin" element={<AdminLayout />}>
            
        </Route>
          
      </Routes>
    
    </BrowserRouter>
        
      );
};

export default App;