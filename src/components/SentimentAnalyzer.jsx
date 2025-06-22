// import {
//     Alert,
//     Box,
//     Button,
//     CircularProgress,
//     Paper,
//     TextField,
//     Typography
// } from '@mui/material';
// import React, { useState } from 'react';
// import { analyzeSentiment } from '../services/api';

// const SentimentAnalyzer = () => {
//   const [text, setText] = useState('');
//   const [sentiment, setSentiment] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleAnalyze = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text to analyze');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       const result = await analyzeSentiment(text);
//       setSentiment(result.sentiment);
//     } catch (err) {
//       setError('Failed to analyze sentiment. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSentimentColor = () => {
//     if (!sentiment) return 'info.main';
    
//     switch (sentiment) {
//       case 'Positive':
//         return 'success.main';
//       case 'Negative':
//         return 'error.main';
//       default:
//         return 'text.primary';
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         News Sentiment Analyzer
//       </Typography>
//       <Typography variant="body2" color="text.secondary" paragraph>
//         Paste news articles or social media posts about stocks to analyze sentiment.
//       </Typography>
      
//       <TextField
//         fullWidth
//         multiline
//         rows={4}
//         variant="outlined"
//         placeholder="Enter text to analyze..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         sx={{ mb: 2 }}
//       />
      
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Button 
//           variant="contained" 
//           onClick={handleAnalyze}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Analyze Sentiment'}
//         </Button>
        
//         {sentiment && (
//           <Typography 
//             variant="h6" 
//             sx={{ color: getSentimentColor() }}
//           >
//             Sentiment: {sentiment}
//           </Typography>
//         )}
//       </Box>
//     </Paper>
//   );
// };

// export default SentimentAnalyzer;




// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Grid,
//   LinearProgress,
//   Paper,
//   TextField,
//   Typography,
//   useTheme
// } from '@mui/material';
// import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
// import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import React, { useState } from 'react';
// import { analyzeSentiment } from '../services/api';

// const SentimentAnalyzer = () => {
//   const [text, setText] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const theme = useTheme();

//   const handleAnalyze = async () => {
//     if (!text.trim()) {
//       setError('Please enter some text to analyze');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await analyzeSentiment(text);
//       setResult(response);
//     } catch (err) {
//       console.error('Sentiment analysis error:', err);
//       setError('Failed to analyze sentiment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSentimentIcon = (sentiment) => {
//     switch (sentiment?.toLowerCase()) {
//       case 'positive':
//         return <SentimentSatisfiedIcon color="success" />;
//       case 'negative':
//         return <SentimentDissatisfiedIcon color="error" />;
//       default:
//         return <SentimentNeutralIcon color="warning" />;
//     }
//   };

//   const getSentimentColor = (sentiment) => {
//     switch (sentiment?.toLowerCase()) {
//       case 'positive':
//         return 'success';
//       case 'negative':
//         return 'error';
//       default:
//         return 'warning';
//     }
//   };

//   const getConfidenceColor = (confidence) => {
//     if (confidence >= 0.8) return 'success';
//     if (confidence >= 0.6) return 'warning';
//     return 'error';
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box mb={3}>
//         <Typography 
//           variant="h5" 
//           gutterBottom
//           sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: 1,
//             fontWeight: 600
//           }}
//         >
//           <AnalyticsIcon color="primary" />
//           Sentiment Analysis
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Analyze the sentiment of news articles, social media posts, or any text related to stocks
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Enter Text to Analyze
//             </Typography>
            
//             <TextField
//               fullWidth
//               multiline
//               rows={6}
//               variant="outlined"
//               placeholder="Enter news article, tweet, or any text about stocks..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               sx={{ mb: 2 }}
//             />

//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <Button
//               variant="contained"
//               onClick={handleAnalyze}
//               disabled={loading || !text.trim()}
//               fullWidth
//               sx={{ py: 1.5 }}
//             >
//               {loading ? (
//                 <>
//                   <CircularProgress size={20} sx={{ mr: 1 }} />
//                   Analyzing...
//                 </>
//               ) : (
//                 'Analyze Sentiment'
//               )}
//             </Button>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           {result ? (
//             <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Analysis Results
//               </Typography>

//               <Card sx={{ mb: 2, bgcolor: theme.palette.grey[50] }}>
//                 <CardContent>
//                   <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       {getSentimentIcon(result.sentiment)}
//                       <Typography variant="h6">
//                         Sentiment
//                       </Typography>
//                     </Box>
//                     <Chip
//                       label={result.sentiment || 'Neutral'}
//                       color={getSentimentColor(result.sentiment)}
//                       sx={{ fontWeight: 600 }}
//                     />
//                   </Box>

//                   <Box mb={2}>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Confidence Level
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <LinearProgress
//                         variant="determinate"
//                         value={(result.confidence || 0.5) * 100}
//                         color={getConfidenceColor(result.confidence)}
//                         sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
//                       />
//                       <Typography variant="body2" fontWeight={600}>
//                         {((result.confidence || 0.5) * 100).toFixed(1)}%
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {result.score !== undefined && (
//                     <Box>
//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         Sentiment Score
//                       </Typography>
//                       <Box display="flex" alignItems="center" gap={2}>
//                         <Box
//                           sx={{
//                             width: '100%',
//                             height: 8,
//                             bgcolor: theme.palette.grey[300],
//                             borderRadius: 4,
//                             position: 'relative'
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               position: 'absolute',
//                               left: '50%',
//                               top: 0,
//                               width: `${Math.abs(result.score) * 50}%`,
//                               height: '100%',
//                               bgcolor: result.score >= 0 ? theme.palette.success.main : theme.palette.error.main,
//                               borderRadius: 4,
//                               transformOrigin: result.score >= 0 ? 'left' : 'right',
//                               transform: result.score >= 0 ? 'translateX(0)' : 'translateX(-100%)'
//                             }}
//                           />
//                         </Box>
//                         <Typography variant="body2" fontWeight={600}>
//                           {result.score.toFixed(2)}
//                         </Typography>
//                       </Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Range: -1 (very negative) to +1 (very positive)
//                       </Typography>
//                     </Box>
//                   )}
//                 </CardContent>
//               </Card>

//               <Alert 
//                 severity={getSentimentColor(result.sentiment)} 
//                 sx={{ borderRadius: 2 }}
//               >
//                 <Typography variant="body2">
//                   {result.sentiment === 'Positive' && 
//                     'This text expresses positive sentiment. This could indicate bullish market sentiment.'}
//                   {result.sentiment === 'Negative' && 
//                     'This text expresses negative sentiment. This could indicate bearish market sentiment.'}
//                   {result.sentiment === 'Neutral' && 
//                     'This text expresses neutral sentiment. The market sentiment appears balanced.'}
//                 </Typography>
//               </Alert>
//             </Paper>
//           ) : (
//             <Paper 
//               elevation={2} 
//               sx={{ 
//                 p: 6, 
//                 borderRadius: 2, 
//                 textAlign: 'center',
//                 bgcolor: theme.palette.grey[50]
//               }}
//             >
//               <AnalyticsIcon 
//                 sx={{ 
//                   fontSize: 64, 
//                   color: theme.palette.grey[400],
//                   mb: 2 
//                 }} 
//               />
//               <Typography variant="h6" color="text.secondary" gutterBottom>
//                 No Analysis Yet
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Enter some text and click "Analyze Sentiment" to see results
//               </Typography>
//             </Paper>
//           )}
//         </Grid>
//       </Grid>

//       {/* Sample texts for testing */}
//       <Box mt={4}>
//         <Typography variant="h6" gutterBottom>
//           Try These Sample Texts
//         </Typography>
//         <Grid container spacing={2}>
//           {[
//             "Apple's latest earnings report exceeded expectations, showing strong growth in all segments.",
//             "Tesla stock plummeted after disappointing delivery numbers and production delays.",
//             "The market remains stable with mixed signals from various economic indicators."
//           ].map((sampleText, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Card 
//                 sx={{ 
//                   cursor: 'pointer',
//                   transition: 'all 0.2s',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: 4
//                   }
//                 }}
//                 onClick={() => setText(sampleText)}
//               >
//                 <CardContent>
//                   <Typography variant="body2">
//                     {sampleText}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default SentimentAnalyzer;




import AnalyticsIcon from '@mui/icons-material/Analytics';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { analyzeSentiment } from '../services/api';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await analyzeSentiment(text);
      setResult(response);
    } catch (err) {
      console.error('Sentiment analysis error:', err);
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return <SentimentSatisfiedIcon color="success" />;
      case 'negative':
        return <SentimentDissatisfiedIcon color="error" />;
      default:
        return <SentimentNeutralIcon color="warning" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'success';
    if (confidence >= 0.6) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box mb={4} textAlign="center">
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          <AnalyticsIcon sx={{ fontSize: 40, mb: -1 }} /> Sentiment Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover if stock-related content is bullish, bearish, or neutral in tone.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Enter Your Text
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder="Paste news, tweets, or articles here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mb: 2 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              {loading ? <><CircularProgress size={20} sx={{ mr: 1 }} /> Analyzing...</> : 'Analyze Sentiment'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {result ? (
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Result
              </Typography>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      {getSentimentIcon(result.sentiment)}
                      <Typography variant="h6">Sentiment</Typography>
                    </Box>
                    <Chip label={result.sentiment || 'Neutral'} color={getSentimentColor(result.sentiment)} />
                  </Box>

                  <Box mt={3}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Confidence Level
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(result.confidence || 0.5) * 100}
                      color={getConfidenceColor(result.confidence)}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="body2" fontWeight={600} mt={1}>
                      {((result.confidence || 0.5) * 100).toFixed(1)}%
                    </Typography>
                  </Box>

                  {result.score !== undefined && (
                    <Box mt={3}>
                      <Typography variant="body2" color="text.secondary">
                        Sentiment Score (−1 to +1)
                      </Typography>
                      <Typography variant="h6" sx={{ color: result.score >= 0 ? 'green' : 'red' }}>
                        {result.score.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              <Alert severity={getSentimentColor(result.sentiment)}>
                {result.sentiment === 'Positive' && 'This is a positive sentiment, suggesting optimistic outlook.'}
                {result.sentiment === 'Negative' && 'This is a negative sentiment, suggesting caution or pessimism.'}
                {result.sentiment === 'Neutral' && 'This is a neutral sentiment with balanced tone.'}
              </Alert>
            </Paper>
          ) : (
            <Paper elevation={1} sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
              <AnalyticsIcon sx={{ fontSize: 60, color: theme.palette.grey[400], mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No Analysis Yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter some text and click "Analyze Sentiment" to begin
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Try with Sample Texts
        </Typography>
        <Grid container spacing={2}>
          {["Apple's earnings exceeded expectations.",
            "Tesla stock fell after weak deliveries.",
            "Market trends remain mixed."]
            .map((text, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  onClick={() => setText(text)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
                    transition: '0.3s',
                  }}
                >
                  <Typography variant="body2">{text}</Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SentimentAnalyzer;
