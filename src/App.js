import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import StockChart from './components/StockChart.jsx';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PortfolioCharts from './pages/portfolio';
import ProfilePage from './pages/Profile.jsx';
import Register from './pages/Register';
import StockDetail from './pages/StockDetail';

import Disclaimer from './pages/Disclaimer.jsx';
import MarketMoreover from './pages/MarketMoreover.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<PortfolioCharts />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/stock/:ticker" element={<StockChartView />} /> */}
            <Route path="/stock/:ticker" element={<StockChart />} />
<Route path="/market" element={<MarketMoreover />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<TermsOfService />} />
<Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
