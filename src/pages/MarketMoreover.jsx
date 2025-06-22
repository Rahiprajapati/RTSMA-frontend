
import { Container, Typography } from '@mui/material';

const MarketMoreover = () => (
  <Container sx={{ py: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Market Moreover
    </Typography>

    <Typography paragraph>
      Welcome to <strong>Market Moreover</strong>, your comprehensive source for in-depth market analysis, real-time data trends, and sectoral intelligence. We go beyond charts and numbers to bring actionable insights.
    </Typography>

    <Typography variant="h6" gutterBottom>
      📊 Weekly Highlights
    </Typography>
    <Typography paragraph>
      • The Technology sector posted a 4.6% gain, driven by bullish performance in AI and semiconductor stocks. <br />
      • Energy prices continued their upward trend amid global supply concerns. <br />
      • Nifty 50 and Sensex hit fresh monthly highs amid strong domestic buying.
    </Typography>

    <Typography variant="h6" gutterBottom>
      🔍 Sectoral Outlook
    </Typography>
    <Typography paragraph>
      Our analysts project continued strength in Healthcare and Banking. Mid-cap IT stocks are showing early signs of accumulation. Meanwhile, real estate remains volatile due to policy uncertainties.
    </Typography>

    <Typography variant="h6" gutterBottom>
      💡 Upcoming Features
    </Typography>
    <Typography paragraph>
      We are working on adding heatmaps, comparative indices performance, and sentiment-based stock scoring — stay tuned for smarter investing tools.
    </Typography>
  </Container>
);

export default MarketMoreover;
