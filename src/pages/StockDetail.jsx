import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import SentimentAnalyzer from '../components/SentimentAnalyzer';
import { getStockPrediction } from '../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced fallback data generator
const generateFallbackStockData = (ticker) => {
  const companyInfo = {
    AAPL: {
      name: 'Apple Inc.',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.'
    },
    GOOGL: {
      name: 'Alphabet Inc.',
      sector: 'Technology',
      industry: 'Internet Content & Information',
      description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.'
    },
    MSFT: {
      name: 'Microsoft Corporation',
      sector: 'Technology',
      industry: 'Software—Infrastructure',
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.'
    },
    AMZN: {
      name: 'Amazon.com, Inc.',
      sector: 'Consumer Cyclical',
      industry: 'Internet Retail',
      description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.'
    },
    TSLA: {
      name: 'Tesla, Inc.',
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.'
    },
    META: {
      name: 'Meta Platforms, Inc.',
      sector: 'Communication Services',
      industry: 'Internet Content & Information',
      description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables.'
    }
  };

  const basePrice = 50 + (ticker.charCodeAt(0) * 3);
  const change = (Math.random() * 10) - 5; // -5% to +5%
  
  return {
    ticker,
    price: basePrice,
    change: change,
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
    peRatio: (Math.random() * 30) + 5,
    dividend: (Math.random() * 3),
    sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
    ...companyInfo[ticker],
    name: companyInfo[ticker]?.name || `${ticker} Corporation`,
    sector: companyInfo[ticker]?.sector || 'Technology',
    industry: companyInfo[ticker]?.industry || 'Software',
    description: companyInfo[ticker]?.description || `${ticker} is a leading company in its sector.`
  };
};

// Mock historical data generator
const generateHistoricalData = (basePrice, ticker) => {
  const dates = [];
  const prices = [];

  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

    const randomFactor = 0.1; // 10% variation
    const randomChange = (Math.random() * 2 - 1) * randomFactor * basePrice;
    prices.push(Math.max(basePrice + randomChange, 1)); // Ensure positive price
  }

  return {
    labels: dates,
    datasets: [
      {
        label: 'Stock Price',
        data: prices,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };
};

const StockDetails = () => {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError('');
      setUsingFallback(false);

      try {
        const data = await getStockPrediction(ticker);
        
        const stockInfo = {
          ticker,
          price: data.predicted_price,
          change: (Math.random() * 6) - 3,
          volume: Math.floor(Math.random() * 10000000) + 1000000,
          marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
          peRatio: (Math.random() * 30) + 5,
          dividend: (Math.random() * 3),
          sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
          name: `${ticker} Corporation`,
          sector: 'Technology',
          industry: 'Software',
          description: `${ticker} is a leading company in its sector.`
        };

        setStockData(stockInfo);
        const historicalData = generateHistoricalData(data.predicted_price, ticker);
        setChartData(historicalData);
        
      } catch (err) {
        console.error('Backend error, using fallback data:', err);
        
        // Use comprehensive fallback data
        const fallbackStockData = generateFallbackStockData(ticker);
        setStockData(fallbackStockData);
        
        const fallbackChartData = generateHistoricalData(fallbackStockData.price, ticker);
        setChartData(fallbackChartData);
        
        setUsingFallback(true);
        setError('Using demo data - backend service unavailable');
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchStockData();
    }
  }, [ticker]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: `${ticker} Price History ${usingFallback ? '(Demo Data)' : ''}` 
      },
    },
    scales: { y: { beginAtZero: false } }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!stockData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Alert severity="error">
          Failed to load stock data for {ticker}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          {stockData.name || ticker} {usingFallback && '(Demo)'}
        </Typography>
        {stockData.sector && <Chip label={stockData.sector} color="primary" size="small" sx={{ mr: 1 }} />}
        {stockData.industry && <Chip label={stockData.industry} variant="outlined" size="small" />}
      </Box>

      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>${stockData.price.toFixed(2)}</Typography>
            <Box display="flex" alignItems="center" mb={2}>
              {stockData.change >= 0 ? <TrendingUpIcon color="success" sx={{ mr: 1 }} /> : <TrendingDownIcon color="error" sx={{ mr: 1 }} />}
              <Typography variant="body1" color={stockData.change >= 0 ? 'success.main' : 'error.main'}>
                {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)}%
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {[
              ['Market Cap', `${(stockData.marketCap / 1e9).toFixed(2)}B`],
              ['Volume', `${(stockData.volume / 1e6).toFixed(2)}M`],
              ['P/E Ratio', stockData.peRatio.toFixed(2)],
              ['Dividend Yield', `${stockData.dividend.toFixed(2)}%`],
            ].map(([label, value]) => (
              <Box mb={2} key={label} height={35} width={150}>
                <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
                <Typography variant="body1">{value}</Typography>
              </Box>
            ))}
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary">Sentiment</Typography>
              <Chip label={stockData.sentiment} color={
                stockData.sentiment === 'Positive' ? 'success' :
                stockData.sentiment === 'Negative' ? 'error' : 'default'
              } size="small" />
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Chart" />
              <Tab label="Company Info" />
              {/* <Tab label="Sentiment Analysis" /> */}
            </Tabs>

            <Box role="tabpanel" hidden={activeTab !== 0}>
              {activeTab === 0 && chartData && (
                <Box height={300} width={800} >
                  <Line options={chartOptions} data={chartData} textAlign={chartData} height={300} width={800} />
                </Box>
              )}
            </Box>

            <Box role="tabpanel" hidden={activeTab !== 1} p={2}>
              {activeTab === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>About {stockData.name || ticker}</Typography>
                  <Typography variant="body1" paragraph>{stockData.description || 'No company description available.'}</Typography>
                  <Typography variant="h6" gutterBottom>Key Statistics</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Sector</Typography><Typography variant="body1">{stockData.sector}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Industry</Typography><Typography variant="body1">{stockData.industry}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Market Cap</Typography><Typography variant="body1">${(stockData.marketCap / 1e9).toFixed(2)}B</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">P/E Ratio</Typography><Typography variant="body1">{stockData.peRatio.toFixed(2)}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Dividend Yield</Typography><Typography variant="body1">{stockData.dividend.toFixed(2)}%</Typography></Grid>
                  </Grid>
                </>
              )}
            </Box>

            <Box role="tabpanel" hidden={activeTab !== 2}>
              {activeTab === 2 && <SentimentAnalyzer />}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StockDetails;
