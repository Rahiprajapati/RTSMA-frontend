import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import SentimentAnalyzer from '../components/SentimentAnalyzer';
import StockCard from '../components/StockCard';
import { addToPortfolio, getStockPrediction } from '../services/api';

const popularStocks = [
  { ticker: 'AAPL', name: 'Apple Inc.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' },
  { ticker: 'MSFT', name: 'Microsoft Corporation' },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
  { ticker: 'TSLA', name: 'Tesla, Inc.' },
  { ticker: 'META', name: 'Meta Platforms, Inc.' },
  { ticker: 'NFLX', name: 'Netflix, Inc.' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation' }
];

const Dashboard = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Remove the useEffect that automatically loads popular stocks
  // useEffect(() => {
  //   const fetchPopularStocks = async () => {
  //     // ... removed automatic loading
  //   };
  //   fetchPopularStocks();
  // }, []);

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim().toUpperCase();
    if (!trimmedQuery) return;

    setLoading(true);
    setError('');

    try {
      const data = await getStockPrediction(trimmedQuery);
      
      // Check if it's a popular stock to get the full name
      const popularStock = popularStocks.find(stock => stock.ticker === trimmedQuery);
      
      setStockData(prev => ({
        ...prev,
        [trimmedQuery]: {
          ticker: trimmedQuery,
          name: popularStock ? popularStock.name : trimmedQuery,
          price: data.predicted_price,
          change: (Math.random() * 6) - 3,
          sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)]
        }
      }));
      setSearchQuery('');
    } catch (err) {
      console.error('Error searching stock:', err);
      setError(`Failed to fetch data for ${trimmedQuery}. Please check the ticker symbol and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderStockGrid = () => {
    const stocksToDisplay = Object.values(stockData);
    if (stocksToDisplay.length === 0) {
      return (
        <Box textAlign="center" py={8}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            📊 No stocks to display
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Search for a stock symbol above to get started!
          </Typography>
        </Box>
      );
    }

    const popularTickersSet = new Set(popularStocks.map(s => s.ticker));
    const cardStocks = stocksToDisplay.filter(stock => popularTickersSet.has(stock.ticker));
    const tableStocks = stocksToDisplay.filter(stock => !popularTickersSet.has(stock.ticker));

    const handleAddToPortfolio = async (stock) => {
      try {
        await addToPortfolio(stock);
        alert(`${stock.ticker} added to portfolio!`);
      } catch (err) {
        alert('Failed to add to portfolio.');
      }
    };

    return (
      <>
        {/* Card Layout for Popular Stocks */}
        {cardStocks.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Popular Stocks
            </Typography>
            <Grid container spacing={4}>
              {cardStocks.map((stock) => (
                <Grid item xs={12} sm={6} md={4} key={stock.ticker}>
                  <StockCard
                    ticker={stock.ticker}
                    price={stock.price}
                    change={stock.change}
                    sentiment={stock.sentiment}
                    onAddToPortfolio={handleAddToPortfolio}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Table Layout for Searched/Non-Popular Stocks */}
        {tableStocks.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Searched Stocks
            </Typography>
            <Paper elevation={3} sx={{ overflowX: 'auto', borderRadius: 3 }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: theme.palette.grey[200] }}>
                    <TableRow>
                      <TableCell><strong>Ticker</strong></TableCell>
                      <TableCell><strong>Price</strong></TableCell>
                      <TableCell><strong>Change</strong></TableCell>
                      <TableCell><strong>Sentiment</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableStocks.map((stock) => (
                      <TableRow key={stock.ticker}>
                        <TableCell>{stock.ticker}</TableCell>
                        <TableCell>${stock.price?.toFixed(2)}</TableCell>
                        <TableCell sx={{ color: stock.change > 0 ? 'green' : 'red' }}>
                          {stock.change.toFixed(2)}%
                        </TableCell>
                        <TableCell>{stock.sentiment}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleAddToPortfolio(stock)}>
                            ➕
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}
      </>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
    <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 4, backgroundColor: theme.palette.background.paper, boxShadow: 5 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a stock symbol (e.g., AAPL, GOOGL, MSFT)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            sx: { borderRadius: 2 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                  {loading ? <CircularProgress size={24} /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ mb: 4, borderRadius: 3, backgroundColor: theme.palette.grey[100], px: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ '& .MuiTabs-indicator': { backgroundColor: 'primary.main' } }}
        >
          <Tab label="📊 Stocks" />
          <Tab label="🧠 Sentiment Analysis" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            renderStockGrid()
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <SentimentAnalyzer />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
