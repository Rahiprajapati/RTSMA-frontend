
import { Container, Typography } from '@mui/material';

const Disclaimer = () => (
  <Container sx={{ py: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Disclaimer
    </Typography>

    <Typography paragraph>
      The information provided on <strong>StockAnalyzer</strong> is for general informational purposes only. While we strive to keep content accurate and up to date, we make no warranties of any kind.
    </Typography>

    <Typography variant="h6" gutterBottom>
      ⚠️ No Financial Advice
    </Typography>
    <Typography paragraph>
      Nothing on this platform constitutes investment advice, recommendation, or solicitation to buy or sell any security.
    </Typography>

    <Typography variant="h6" gutterBottom>
      📈 Stock Data Accuracy
    </Typography>
    <Typography paragraph>
      Stock prices, predictions, and charts are powered by third-party APIs like Alpha Vantage or Yahoo Finance. Minor delays or inaccuracies may occur.
    </Typography>

    <Typography variant="h6" gutterBottom>
      🛡️ User Responsibility
    </Typography>
    <Typography paragraph>
      You are solely responsible for evaluating the merits and risks associated with using the platform. We are not liable for any financial decisions made based on our content.
    </Typography>
  </Container>
);

export default Disclaimer;
