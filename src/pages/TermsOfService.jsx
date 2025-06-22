
import { Container, Typography } from '@mui/material';

const TermsOfService = () => (
  <Container sx={{ py: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Terms of Service
    </Typography>

    <Typography paragraph>
      By using <strong>StockAnalyzer</strong>, you agree to comply with our terms outlined here. These rules ensure fair usage and safeguard user experience.
    </Typography>

    <Typography variant="h6" gutterBottom>
      ⚙️ Use of Service
    </Typography>
    <Typography paragraph>
      • You must be at least 16 years old to use this platform. <br />
      • Do not misuse the service by attempting to hack, scrape, or disrupt its availability. <br />
      • Automated data scraping is prohibited unless permission is granted.
    </Typography>

    <Typography variant="h6" gutterBottom>
      📉 Financial Risk
    </Typography>
    <Typography paragraph>
      All stock data is for informational purposes only. We do not offer financial or investment advice. Users should do their own research or consult licensed advisors.
    </Typography>

    <Typography variant="h6" gutterBottom>
      🔧 Service Interruptions
    </Typography>
    <Typography paragraph>
      We strive for uptime and stability. However, planned or unplanned maintenance may cause temporary downtime. We are not liable for any loss caused by such interruptions.
    </Typography>
  </Container>
);

export default TermsOfService;
