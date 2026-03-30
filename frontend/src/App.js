import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' replace />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
