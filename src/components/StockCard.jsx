// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const StockCard = ({ ticker, price, change, sentiment }) => {
//   const navigate = useNavigate();
//   const isPositive = change >= 0;

//   const getSentimentColor = () => {
//     switch (sentiment) {
//       case 'Positive':
//         return 'success';
//       case 'Negative':
//         return 'error';
//       default:
//         return 'default';
//     }
//   };

//   return (
//     <Card 
//       sx={{ 
//         minWidth: 275, 
//         transition: 'transform 0.3s', 
//         '&:hover': { 
//           transform: 'translateY(-5px)',
//           boxShadow: 6
//         } 
//       }}
//     >
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h5" component="div">
//             {ticker}
//           </Typography>
//           <Chip 
//             label={sentiment || 'Neutral'} 
//             color={getSentimentColor()} 
//             size="small" 
//           />
//         </Box>
//         <Typography variant="h4" component="div" gutterBottom>
//           ${price.toFixed(2)}
//         </Typography>
//         <Box display="flex" alignItems="center" mb={2}>
//           {isPositive ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
//           <Typography 
//             variant="body2" 
//             color={isPositive ? 'success.main' : 'error.main'}
//             sx={{ ml: 1 }}
//           >
//             {isPositive ? '+' : ''}{change.toFixed(2)}% today
//           </Typography>
//         </Box>
//         <Button 
//           variant="contained" 
//           fullWidth 
//           onClick={() => navigate(`/stock/${ticker}`)}
//         >
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default StockCard;



// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { Box, Button, Card, CardContent, Chip, Typography, useTheme } from '@mui/material';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const StockCard = ({ ticker, price, change, sentiment }) => {
//   const navigate = useNavigate();
//   const isPositive = change >= 0;
//   const theme = useTheme();

//   const getSentimentColor = () => {
//     switch ((sentiment || '').toLowerCase()) {
//       case 'positive':
//         return 'success';
//       case 'negative':
//         return 'error';
//       default:
//         return 'warning';
//     }
//   };

//   return (
//     <Card
//       sx={{
//         minWidth: 260,
//         borderRadius: 3,
//         p: 2,
//         bgcolor: theme.palette.mode === 'light' ? '#fdfdfd' : theme.palette.background.paper,
//         boxShadow: 2,
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           transform: 'translateY(-6px)',
//           boxShadow: 6,
//         },
//       }}
//     >
//       <CardContent>
//         {/* Ticker and Sentiment */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//           <Typography variant="h6" fontWeight={600}>
//             {ticker}
//           </Typography>
//           <Chip
//             label={sentiment || 'Neutral'}
//             color={getSentimentColor()}
//             size="small"
//             sx={{ fontWeight: 600, textTransform: 'capitalize' }}
//           />
//         </Box>

//         {/* Price */}
//         <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: 'primary.main' }}>
//           ${price.toFixed(2)}
//         </Typography>

//         {/* Change */}
//         <Box display="flex" alignItems="center" mb={2}>
//           {isPositive ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
//           <Typography
//             variant="body2"
//             fontWeight={600}
//             sx={{ ml: 1, color: isPositive ? 'success.main' : 'error.main' }}
//           >
//             {isPositive ? '+' : ''}
//             {change.toFixed(2)}% today
//           </Typography>
//         </Box>

//         {/* Action */}
//         <Button
//           variant="contained"
//           fullWidth
//           size="large"
//           onClick={() => navigate(`/stock/${ticker}`)}
//           sx={{
//             borderRadius: 2,
//             fontWeight: 600,
//             textTransform: 'none',
//             py: 1.2,
//             backgroundColor: theme.palette.primary.main,
//             '&:hover': {
//               backgroundColor: theme.palette.primary.dark,
//             },
//           }}
//         >
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default StockCard;





import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Card, CardContent, Chip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StockCard = ({ ticker, price, change, sentiment, onAddToPortfolio }) => {
  const navigate = useNavigate();
  const isPositive = change >= 0;
  const theme = useTheme();

  const getSentimentColor = () => {
    switch ((sentiment || '').toLowerCase()) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Card
      sx={{
        minWidth: 260,
        borderRadius: 3,
        p: 2,
        bgcolor: theme.palette.mode === 'light' ? '#fdfdfd' : theme.palette.background.paper,
        boxShadow: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        {/* Ticker and Sentiment */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight={600}>
            {ticker}
          </Typography>
          <Chip
            label={sentiment || 'Neutral'}
            color={getSentimentColor()}
            size="small"
            sx={{ fontWeight: 600, textTransform: 'capitalize' }}
          />
        </Box>

        {/* Price */}
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: 'primary.main' }}>
          ${price.toFixed(2)}
        </Typography>

        {/* Change */}
        <Box display="flex" alignItems="center" mb={2}>
          {isPositive ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ ml: 1, color: isPositive ? 'success.main' : 'error.main' }}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(2)}% today
          </Typography>
        </Box>

        {/* Action */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => navigate(`/stock/${ticker}`)}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            py: 1.2,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          View Details
        </Button>
        {onAddToPortfolio && (
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FavoriteIcon />}
            sx={{ mt: 1 }}
            onClick={() => onAddToPortfolio({ ticker, price, change, sentiment })}
          >
            Add to Portfolio
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StockCard;