import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import Info from './page/info.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/info' element={<Info />} />
      </Routes>
    </BrowserRouter>
  </>
);
