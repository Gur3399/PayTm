import react from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path = "/signup" element ={<Signup />} />
      <Route path = "/signin" element ={<Signin />} />
      <Route path = "/dashboard" element ={<Dashboard />} />
      <Route path = "/send" element ={<SendMoney />} />
    </Routes>
    <AppBar />
    </BrowserRouter>
 
    </>
  );
}


function AppBar()
{
   const navigate = useNavigate();

   return (
    <div className=' flex flex-col justify-between   bg-black text-white'>
        <button onClick= {()=>{
           navigate("/dashboard");
         }}>Dashboard</button>

        <button onClick= {()=>{
           navigate("/signin");
         }}>signin</button>

        <button onClick= {()=>{
           navigate("/signup");
         }}>signup</button>

         <button onClick ={()=>{
          navigate("/send");
         }}>Send</button>
     </div>
   )
}

export default App
