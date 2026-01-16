import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import MusicDashboard from './pages/musicDashboard/MusicDashboard'
import ProtectedRoute from './routes/ProtectedRoute';
import MusicModel from './pages/musicModel/MusicModel';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/model' element={<MusicModel/>}/>
          <Route path='/dashboard' 
          element = { <ProtectedRoute>
            <MusicDashboard/>
            </ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
