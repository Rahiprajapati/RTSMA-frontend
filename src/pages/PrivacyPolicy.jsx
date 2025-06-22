
import { Container, Typography } from '@mui/material';

const PrivacyPolicy = () => (
  <Container sx={{ py: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Privacy Policy
    </Typography>

    <Typography paragraph>
      At <strong>StockAnalyzer</strong>, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal data when you use our platform.
    </Typography>

    <Typography variant="h6" gutterBottom>
      🔐 Data Collection
    </Typography>
    <Typography paragraph>
      We collect non-sensitive personal information such as email, preferences, and usage logs. This helps us deliver tailored stock alerts, newsletter updates, and market analysis.
    </Typography>

    <Typography variant="h6" gutterBottom>
      🔄 How We Use Your Data
    </Typography>
    <Typography paragraph>
      Your data is used to:
      • Provide personalized stock recommendations <br />
      • Improve site performance and security <br />
      • Communicate important product updates
    </Typography>

    <Typography variant="h6" gutterBottom>
      ❌ Data Sharing
    </Typography>
    <Typography paragraph>
      We do not sell or share your personal data with third parties. Analytics data may be used in aggregate for improving our services.
    </Typography>

    <Typography variant="h6" gutterBottom>
      📧 Contact
    </Typography>
    <Typography paragraph>
      For any privacy concerns, email us at <strong>privacy@stockanalyzer.com</strong>
    </Typography>
  </Container>
);

export default PrivacyPolicy;
