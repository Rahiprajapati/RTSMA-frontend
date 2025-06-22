import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPortfolio, getStockPrediction } from '../services/api';

const Portfolio = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    totalChange: 0,
    bestPerformer: null,
    worstPerformer: null
  });

  const safeToNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const formatPrice = (price) => `${safeToNumber(price).toFixed(2)}`;
  const formatChange = (change) => `${safeToNumber(change).toFixed(2)}%`;

  useEffect(() => {
    if (!isAuthenticated) return navigate('/login');

    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        let stocks = Array.isArray(data) && data.length ? data : [];
        if (!stocks.length) throw new Error();
        let totalValue = 0, totalChange = 0;
        stocks = stocks.map((s) => {
          const value = safeToNumber(s.price) * safeToNumber(s.shares);
          totalValue += value;
          totalChange += safeToNumber(s.change);
          return { ...s, value };
        });
        const best = [...stocks].sort((a, b) => b.change - a.change)[0];
        const worst = [...stocks].sort((a, b) => a.change - b.change)[0];
        setPortfolioStats({
          totalValue,
          totalChange: totalChange / stocks.length,
          bestPerformer: best,
          worstPerformer: worst
        });
        setPortfolio(stocks);
      } catch {
        setError('Failed to load data. Showing demo.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAllStocks = async () => {
      try {
        // Dummy stock data for search dropdown
        setAllStocks([
  // Global Stocks
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'TSLA', name: 'Tesla Inc.' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.' },
  { ticker: 'META', name: 'Meta Platforms Inc.' },
  { ticker: 'NFLX', name: 'Netflix Inc.' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation' },
  { ticker: 'INTC', name: 'Intel Corporation' },
  { ticker: 'BABA', name: 'Alibaba Group Holding Ltd.' },

  // Indian Stocks
  { ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.' },
  { ticker: 'TCS.NS', name: 'Tata Consultancy Services Ltd.' },
  { ticker: 'INFY.NS', name: 'Infosys Ltd.' },
  { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.' },
  { ticker: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.' },
  { ticker: 'ITC.NS', name: 'ITC Ltd.' },
  { ticker: 'SBIN.NS', name: 'State Bank of India' },
  { ticker: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank Ltd.' },
  { ticker: 'ASIANPAINT.NS', name: 'Asian Paints Ltd.' },
  { ticker: 'LT.NS', name: 'Larsen & Toubro Ltd.' },
  { ticker: 'IRCTC.NS', name: 'IRCTC Ltd.' },

  // Index Tickers
  { ticker: '^NSEI', name: 'Nifty 50 Index' },
  { ticker: '^NSEBANK', name: 'Nifty Bank Index' }
]);
;
      } catch (err) {
        console.error('Error loading stock list', err);
      }
    };

    fetchPortfolio();
    fetchAllStocks();
  }, [isAuthenticated, navigate, location.key]);

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/stock/${searchValue.ticker}`);
    }
  };

  const handleRowClick = async (ticker) => {
    try {
      const data = await getStockPrediction(ticker);
      setSnackbarMessage(`Prediction for ${ticker}: $${formatPrice(data.predicted_price)}`);
      setSnackbarSeverity('success');
    } catch {
      setSnackbarMessage(`Failed to fetch prediction for ${ticker}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Portfolio</Typography>

      {/* Search */}
      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 4, background: '#f0f4f8' }}>
        <Typography variant="h6" fontWeight={600}>Search Stocks</Typography>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mt={2}>
          <Autocomplete
            options={allStocks}
            getOptionLabel={(option) => `${option.ticker} - ${option.name}`}
            value={searchValue}
            onChange={(e, newValue) => setSearchValue(newValue)}
            renderInput={(params) => <TextField {...params} label="Ticker Symbol" fullWidth />}
            isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={!searchValue} sx={{ px: 4 }}>View</Button>
        </Box>
      </Paper>

      {/* Alert */}
      {error && <Alert severity="warning" sx={{ mb: 4 }}>{error}</Alert>}

      {/* Table */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>Holdings</Typography>
          <Button onClick={() => navigate(0)} variant="outlined">Refresh</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#f7fafc' }}>
                <TableCell><strong>Ticker</strong></TableCell>
                <TableCell align="right"><strong>Price</strong></TableCell>
                <TableCell align="right"><strong>Change</strong></TableCell>
                <TableCell align="center"><strong>Sentiment</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((stock, idx) => (
                <TableRow key={idx} hover onClick={() => handleRowClick(stock.ticker)}>
                  <TableCell><strong>{stock.ticker}</strong></TableCell>
                  <TableCell align="right">${formatPrice(stock.price)}</TableCell>
                  <TableCell align="right" sx={{ color: stock.change >= 0 ? 'green' : 'red' }}>{formatChange(stock.change)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={stock.sentiment}
                      sx={{
                        backgroundColor:
                          stock.sentiment === 'Positive' ? '#e8f5e9' :
                          stock.sentiment === 'Negative' ? '#ffebee' : '#eceff1',
                        color:
                          stock.sentiment === 'Positive' ? 'green' :
                          stock.sentiment === 'Negative' ? 'red' : 'gray',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); handleRowClick(stock.ticker); }}>Predict</Button>
                      <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); navigate(`/stock/${stock.ticker}`); }}>Details</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Snackbar for Prediction */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Portfolio;
