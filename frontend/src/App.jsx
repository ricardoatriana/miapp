import { BrowserRouter, Route, Routes } from 'react-router-dom'; {/*React router library*/ }
import UserLayout from './components/Layout/UserLayout';


const App = () => {
  return (
    <BrowserRouter> {/*enable client side routing, each route is handle in the browser rather than in the server*/}

      <Routes>
        <Route path="/" element={<UserLayout />}>
       
    
          
        </Route>
        
          
      </Routes>
    
    </BrowserRouter>
        
      );
};

export default App;