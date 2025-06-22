import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { getStockPrediction } from '../services/api';

const formatPrice = (price) => {
  const num = parseFloat(price);
  return isNaN(num) ? '$0.00' : `${num.toFixed(2)}`;
};

// Generate fallback data when backend is not available
const generateFallbackData = (ticker) => {
  const basePrice = 100 + (ticker.charCodeAt(0) * 2); // Use ticker to generate consistent base price
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate realistic price movement
    const randomChange = (Math.random() - 0.5) * 0.05; // 5% daily volatility
    const trendChange = i < 15 ? 0.001 : -0.001; // Slight trend
    const price = basePrice * (1 + (randomChange + trendChange) * i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(Math.max(price, 10).toFixed(2)) // Ensure price doesn't go below $10
    });
  }
  
  return {
    history: data,
    predicted_price: data[data.length - 1].price * (1 + (Math.random() * 0.1 - 0.05)) // ±5% from last price
  };
};

const StockChart = () => {
  const { ticker } = useParams();
  const [chartData, setChartData] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError('');
      setUsingFallback(false);
      
      try {
        const data = await getStockPrediction(ticker);
        setChartData(data.history);
        setPredictedPrice(data.predicted_price);
      } catch (err) {
        console.error('Backend error, using fallback data:', err);
        
        // Use fallback data when backend fails
        const fallbackData = generateFallbackData(ticker);
        setChartData(fallbackData.history);
        setPredictedPrice(fallbackData.predicted_price);
        setUsingFallback(true);
        setError('Using demo data - backend service unavailable');
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchChartData();
    }
  }, [ticker]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        {ticker} - Stock Price Trend {usingFallback && '(Demo Data)'}
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {predictedPrice && (
        <Typography variant="body2" color="textSecondary" mb={2}>
          📈 {usingFallback ? 'Demo' : 'Predicted'} Price: 
          <strong style={{ color: '#1e88e5' }}>{formatPrice(predictedPrice)}</strong>
        </Typography>
      )}

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1e88e5" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip
            formatter={(value) => [formatPrice(value), 'Price']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#1e88e5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#priceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default StockChart;




// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Paper,
//   Typography,
//   Divider
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis
// } from 'recharts';
// import { getStockPrediction } from '../services/api';

// const formatPrice = (price) => {
//   const num = parseFloat(price);
//   return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
// };

// const generateFallbackData = (ticker) => {
//   const basePrice = 100 + (ticker.charCodeAt(0) * 2);
//   const data = [];

//   for (let i = 30; i >= 0; i--) {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     const randomChange = (Math.random() - 0.5) * 0.05;
//     const trendChange = i < 15 ? 0.001 : -0.001;
//     const price = basePrice * (1 + (randomChange + trendChange) * i);

//     data.push({
//       date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       price: parseFloat(Math.max(price, 10).toFixed(2))
//     });
//   }

//   return {
//     history: data,
//     predicted_price: data[data.length - 1].price * (1 + (Math.random() * 0.1 - 0.05))
//   };
// };

// const StockChart = () => {
//   const { ticker } = useParams();
//   const [chartData, setChartData] = useState([]);
//   const [predictedPrice, setPredictedPrice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [usingFallback, setUsingFallback] = useState(false);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       setLoading(true);
//       setError('');
//       setUsingFallback(false);

//       try {
//         const data = await getStockPrediction(ticker);
//         setChartData(data.history);
//         setPredictedPrice(data.predicted_price);
//       } catch (err) {
//         console.error('Backend error, using fallback data:', err);
//         const fallbackData = generateFallbackData(ticker);
//         setChartData(fallbackData.history);
//         setPredictedPrice(fallbackData.predicted_price);
//         setUsingFallback(true);
//         setError('Using demo data - backend service unavailable');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (ticker) {
//       fetchChartData();
//     }
//   }, [ticker]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress size={60} sx={{ color: '#1e88e5' }} />
//       </Box>
//     );
//   }

//   return (
//     <Paper
//       elevation={6}
//       sx={{
//         p: { xs: 2, md: 4 },
//         borderRadius: 4,
//         bgcolor: '#f8fafc',
//         boxShadow: '0px 10px 25px rgba(0,0,0,0.05)',
//       }}
//     >
//       <Box mb={2}>
//         <Typography variant="h5" fontWeight={600} color="text.primary">
//           {ticker} Stock Trend {usingFallback && <Typography variant="caption" color="text.secondary">(Demo Data)</Typography>}
//         </Typography>

//         {predictedPrice && (
//           <Typography variant="subtitle1" mt={1} color="text.secondary">
//             📈 {usingFallback ? 'Demo' : 'Predicted'} Price:{' '}
//             <Typography component="span" fontWeight={600} color="#1e88e5">
//               {formatPrice(predictedPrice)}
//             </Typography>
//           </Typography>
//         )}

//         {error && (
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <ResponsiveContainer width="100%" height={350}>
//         <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//           <defs>
//             <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#1e88e5" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="date" fontSize={12} />
//           <YAxis fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
//           <Tooltip
//             contentStyle={{ borderRadius: 8, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
//             formatter={(value) => [formatPrice(value), 'Price']}
//             labelFormatter={(label) => `📅 ${label}`}
//           />
//           <Area
//             type="monotone"
//             dataKey="price"
//             stroke="#1e88e5"
//             strokeWidth={2}
//             fillOpacity={1}
//             fill="url(#priceGradient)"
//             dot={{ r: 2, strokeWidth: 1 }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Paper>
//   );
// };

// export default StockChart;



// ///////////////////////////////////////



// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Paper,
//   Typography,
//   useTheme
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis
// } from 'recharts';
// import { getStockPrediction } from '../services/api';

// const formatPrice = (price) => {
//   const num = parseFloat(price);
//   return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
// };

// const generateFallbackData = (ticker) => {
//   const basePrice = 100 + (ticker.charCodeAt(0) * 2);
//   const data = [];

//   for (let i = 30; i >= 0; i--) {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     const randomChange = (Math.random() - 0.5) * 0.05;
//     const trendChange = i < 15 ? 0.001 : -0.001;
//     const price = basePrice * (1 + (randomChange + trendChange) * i);

//     data.push({
//       date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       price: parseFloat(Math.max(price, 10).toFixed(2))
//     });
//   }

//   return {
//     history: data,
//     predicted_price: data[data.length - 1].price * (1 + (Math.random() * 0.1 - 0.05))
//   };
// };

// const StockChart = () => {
//   const { ticker } = useParams();
//   const [chartData, setChartData] = useState([]);
//   const [predictedPrice, setPredictedPrice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [usingFallback, setUsingFallback] = useState(false);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchChartData = async () => {
//       setLoading(true);
//       setError('');
//       setUsingFallback(false);

//       try {
//         const data = await getStockPrediction(ticker);
//         setChartData(data.history);
//         setPredictedPrice(data.predicted_price);
//       } catch (err) {
//         const fallbackData = generateFallbackData(ticker);
//         setChartData(fallbackData.history);
//         setPredictedPrice(fallbackData.predicted_price);
//         setUsingFallback(true);
//         setError('Using demo data - backend service unavailable');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (ticker) {
//       fetchChartData();
//     }
//   }, [ticker]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress size={60} sx={{ color: '#1e88e5' }} />
//       </Box>
//     );
//   }

//  return (
//   <Box
//     sx={{
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'center',
//       px: 2,
//     }}
//   >
//     <Paper
//       elevation={4}
//       sx={{
//         width: '100%',
//         maxWidth: '1000px',
//         px: { xs: 2, md: 4 },
//         py: { xs: 3, md: 4 },
//         borderRadius: 4,
//         backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
//         boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
//       }}
//     >
//       {/* Header */}
//       <Box mb={2}>
//         <Typography variant="h5" fontWeight={600}>
//           {ticker?.toUpperCase()} Stock Performance
//         </Typography>

//         <Typography variant="subtitle2" color="text.secondary" mt={0.5}>
//           Real-time trend analysis {usingFallback && `(Demo Data)`}
//         </Typography>

//         {predictedPrice && (
//           <Typography variant="body2" mt={1}>
//             📊 Predicted Price:{' '}
//             <strong style={{ color: '#1e88e5' }}>{formatPrice(predictedPrice)}</strong>
//           </Typography>
//         )}

//         {error && (
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>

//       {/* Chart */}
//       <ResponsiveContainer width="100%" height={350}>
//         <AreaChart data={chartData}>
//           <defs>
//             <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#1e88e5" stopOpacity={0.05} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
//           <XAxis dataKey="date" fontSize={12} />
//           <YAxis fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#ffffff',
//               border: '1px solid #ddd',
//               borderRadius: 10,
//               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
//               fontSize: 13,
//             }}
//             formatter={(value) => [formatPrice(value), 'Price']}
//             labelFormatter={(label) => `📅 ${label}`}
//           />
//           <Area
//             type="monotone"
//             dataKey="price"
//             stroke="#1e88e5"
//             strokeWidth={2}
//             fillOpacity={1}
//             fill="url(#priceGradient)"
//             dot={false}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Paper>
//   </Box>
// );

// };

// export default StockChart;
