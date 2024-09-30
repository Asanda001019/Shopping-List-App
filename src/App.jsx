import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddList from './pages/AddList';
import ViewAllLists from './pages/ViewAllLists';
// import ViewCategory from './pages/ViewCategory';
import { AuthProvider } from './pages/AuthContext';
import PrivacyPolicy from './components/PrivacyPolicy';
import NoPage from './components/NoPage';

const App = () => {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
    
      <Router>
        {/* Navigation at the top */}
        <Navigation />

        {/* Main content area with flex-grow to push the footer down */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
          <Route path="/privacy" element={<PrivacyPolicy/>} /> 
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<AddList />} />
            <Route path="/all" element={<ViewAllLists />} />
            {/* <Route path="/category/:category" element={<ViewCategory />} /> */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </Router>
    </div>
    </AuthProvider>
  );
};

export default App;
