import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddList from './pages/AddList';
import ViewAllLists from './pages/ViewAllLists'
import { AuthProvider } from './pages/AuthContext';
import PrivacyPolicy from './components/PrivacyPolicy';
import NoPage from './components/NoPage';
import ListDetail from './pages/ListDetail';

const App = () => {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
    
      <Router>
       
        <Navigation />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
          <Route path="/privacy" element={<PrivacyPolicy/>} /> 
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<AddList />} />
            <Route path="/all" element={<ViewAllLists />} />
            <Route path="/list/:id" element={<ListDetail />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
    </AuthProvider>
  );
};

export default App;
