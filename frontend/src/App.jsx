import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../src/pages/Landing';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        
          <Route path='/' element={ <Landing/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/register' element={ <Register/> } />
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute> } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App