// import {
//   AccountBalance,
//   EmojiObjects,
//   Insights,
//   QueryStats,
//   ShowChart,
//   TrendingUp,
// } from '@mui/icons-material';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import Marquee from 'react-fast-marquee';
// import { Link as RouterLink } from 'react-router-dom';

// const Home = () => {
//   const theme = useTheme();

//   const features = [
//     {
//       icon: <ShowChart fontSize="inherit" />,
//       title: 'Stock Predictions',
//       description: 'Accurate predictions using machine learning.',
//     },
//     {
//       icon: <TrendingUp fontSize="inherit" />,
//       title: 'Sentiment Analysis',
//       description: 'Analyze social media & news for market mood.',
//     },
//     {
//       icon: <AccountBalance fontSize="inherit" />,
//       title: 'Portfolio Manager',
//       description: 'Track and manage investments in real-time.',
//     },
//     {
//       icon: <EmojiObjects fontSize="inherit" />,
//       title: 'Smart Insights',
//       description: 'Get deep insights with visualization tools.',
//     },
//     {
//       icon: <Insights fontSize="inherit" />,
//       title: 'Live Charts',
//       description: 'View dynamic charts with technical indicators.',
//     },
//     {
//       icon: <QueryStats fontSize="inherit" />,
//       title: 'Performance Metrics',
//       description: 'Analyze portfolio and stock performance.',
//     },
//   ];

//   const popularStocks = [
//     { ticker: 'AAPL', price: '$195.12' },
//     { ticker: 'GOOGL', price: '$2889.10' },
//     { ticker: 'AMZN', price: '$132.25' },
//     { ticker: 'TSLA', price: '$182.54' },
//     { ticker: 'META', price: '$306.79' },
//   ];

//   return (
//     <Box>
//       {/* Marquee Section */}
//       <Box sx={{ bgcolor: '#0d1117', color: '#fff', py: 1 }}>
//         <Marquee speed={50} gradient={false}>
//           {popularStocks.map((stock, idx) => (
//             <Typography
//               key={idx}
//               sx={{
//                 mx: 4,
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 display: 'inline-block',
//               }}
//             >
//               {stock.ticker}: <span style={{ color: '#00e676' }}>{stock.price}</span>
//             </Typography>
//           ))}
//         </Marquee>
//       </Box>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           bgcolor: 'primary.main',
//           color: '#fff',
//           py: 10,
//           textAlign: 'center',
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//             Real-Time Stock Market Analysis
//           </Typography>
//           <Typography variant="h6" color="rgba(255,255,255,0.85)" mb={3}>
//             Predict trends, analyze sentiment, and manage your investments smarter.
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             size="large"
//             component={RouterLink}
//             to="/register"
//             sx={{ mr: 2 }}
//           >
//             Get Started
//           </Button>
//           <Button
//             variant="outlined"
//             color="inherit"
//             size="large"
//             component={RouterLink}
//             to="/login"
//           >
//             Login
//           </Button>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Container sx={{ py: 10 }}>
//   <Typography
//     variant="h4"
//     fontWeight="bold"
//     textAlign="center"
//     mb={6}
//     sx={{ letterSpacing: 1.5 }}
//   >
//     Platform Features
//   </Typography>

//   <Box
//     sx={{
//       display: 'flex',
//       flexWrap: 'wrap',
//       justifyContent: 'center',
//       gap: 4,
//     }}
//   >
//     {features.map((feature, idx) => (
//       <Card
//         key={idx}
//         elevation={4}
//         sx={{
//           width: '30%',
//           minWidth: 280,
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//           px: 3,
//           py: 5,
//           borderRadius: 4,
//           transition: 'transform 0.3s, box-shadow 0.3s',
//           '&:hover': {
//             transform: 'translateY(-6px)',
//             boxShadow: 6,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             width: 80,
//             height: 80,
//             mb: 3,
//             borderRadius: '50%',
//             bgcolor: 'secondary.main',
//             color: 'white',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: '2.5rem',
//             boxShadow: 4,
//             transition: 'all 0.3s ease',
//           }}
//         >
//           {feature.icon}
//         </Box>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           {feature.title}
//         </Typography>
//         <Typography color="text.secondary">{feature.description}</Typography>
//       </Card>
//     ))}
//   </Box>
// </Container>

//        {/* 📊 Popular Stocks */}
//       <Box sx={{ bgcolor: '#f7faff', py: 10 }}>
//         <Container maxWidth="lg">
//           <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
//             Popular Stocks
//           </Typography>
//           <Typography variant="h6" align="center" color="text.secondary" paragraph>
//             Track the performance of these trending stocks.
//           </Typography>

//           <Grid container spacing={4} justifyContent="center" mt={4}>
//             {['AAPL', 'GOOGL', 'MSFT', 'AMZN'].map((ticker) => (
//               <Grid item key={ticker}>
//                 <Card
//                   sx={{
//                     width: 250,
//                     backgroundColor: 'white',
//                     textAlign: 'center',
//                     boxShadow: 3,
//                     transition: '0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-5px)',
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h5" gutterBottom>
//                       {ticker}
//                     </Typography>
//                     <Button
//                       variant="contained"
//                       fullWidth
//                       component={RouterLink}
//                       to={`/stock/${ticker}`}
//                     >
//                       View Details
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box textAlign="center" mt={6}>
//             <Button
//               variant="outlined"
//               size="large"
//               component={RouterLink}
//               to="/dashboard"
//             >
//               Explore More Stocks
//             </Button>
//           </Box>
//         </Container>
//       </Box>


//       {/* CTA Section */}
//       <Box
//         sx={{
//           bgcolor: 'primary.dark',
//           color: '#fff',
//           py: 8,
//           mt: 10,
//           borderTopLeftRadius: 60,
//           borderTopRightRadius: 60,
//           textAlign: 'center',
//         }}
//       >
//         <Container maxWidth="sm">
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Ready to Invest Smarter?
//           </Typography>
//           <Typography variant="h6" color="rgba(255,255,255,0.85)" mb={4}>
//             Sign up now and start your financial journey with real-time insights.
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             size="large"
//             component={RouterLink}
//             to="/register"
//             sx={{ px: 6 }}
//           >
//             Join Now
//           </Button>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Home;




import React, { useEffect, useState } from 'react';
import {
  AccountBalance,
  EmojiObjects,
  Insights,
  QueryStats,
  ShowChart,
  TrendingUp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import Marquee from 'react-fast-marquee';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for login status (adjust key as per your app, like 'token' or 'user')
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const features = [
    {
      icon: <ShowChart fontSize="inherit" />,
      title: 'Stock Predictions',
      description: 'Accurate predictions using machine learning.',
    },
    {
      icon: <TrendingUp fontSize="inherit" />,
      title: 'Sentiment Analysis',
      description: 'Analyze social media & news for market mood.',
    },
    {
      icon: <AccountBalance fontSize="inherit" />,
      title: 'Portfolio Manager',
      description: 'Track and manage investments in real-time.',
    },
    {
      icon: <EmojiObjects fontSize="inherit" />,
      title: 'Smart Insights',
      description: 'Get deep insights with visualization tools.',
    },
    {
      icon: <Insights fontSize="inherit" />,
      title: 'Live Charts',
      description: 'View dynamic charts with technical indicators.',
    },
    {
      icon: <QueryStats fontSize="inherit" />,
      title: 'Performance Metrics',
      description: 'Analyze portfolio and stock performance.',
    },
  ];

  const popularStocks = [
    { ticker: 'AAPL', price: '$195.12' },
    { ticker: 'GOOGL', price: '$2889.10' },
    { ticker: 'AMZN', price: '$132.25' },
    { ticker: 'TSLA', price: '$182.54' },
    { ticker: 'META', price: '$306.79' },
  ];

  return (
    <Box>
      {/* Marquee Section */}
      <Box sx={{ bgcolor: '#0d1117', color: '#fff', py: 1 }}>
        <Marquee speed={50} gradient={false}>
          {popularStocks.map((stock, idx) => (
            <Typography
              key={idx}
              sx={{
                mx: 4,
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'inline-block',
              }}
            >
              {stock.ticker}:{' '}
              <span style={{ color: '#00e676' }}>{stock.price}</span>
            </Typography>
          ))}
        </Marquee>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Real-Time Stock Market Analysis
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.85)" mb={3}>
            Predict trends, analyze sentiment, and manage your investments smarter.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to={isLoggedIn ? '/dashboard' : '/register'}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          sx={{ letterSpacing: 1.5 }}
        >
          Platform Features
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {features.map((feature, idx) => (
            <Card
              key={idx}
              elevation={4}
              sx={{
                width: '30%',
                minWidth: 280,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                px: 3,
                py: 5,
                borderRadius: 4,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mb: 3,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: 4,
                  transition: 'all 0.3s ease',
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">{feature.description}</Typography>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Popular Stocks */}
      <Box sx={{ bgcolor: '#f7faff', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Popular Stocks
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Track the performance of these trending stocks.
          </Typography>

          <Grid container spacing={4} justifyContent="center" mt={4}>
            {['AAPL', 'GOOGL', 'MSFT', 'AMZN'].map((ticker) => (
              <Grid item key={ticker}>
                <Card
                  sx={{
                    width: 250,
                    backgroundColor: 'white',
                    textAlign: 'center',
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {ticker}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      component={RouterLink}
                      to={`/stock/${ticker}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6}>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/dashboard"
            >
              Explore More Stocks
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: '#fff',
          py: 8,
          mt: 10,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Invest Smarter?
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.85)" mb={4}>
            Sign up now and start your financial journey with real-time insights.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ px: 6 }}
          >
            Join Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
