import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 6,
        pb: 4,
        background: '#0D1B2A',
        color: '#e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo + About */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              StockAnalyzer
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: '#b0bec5' }}>
              Real-time insights, trends, and smart tools to help you navigate the stock market.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton href="#" sx={iconStyle}><TwitterIcon /></IconButton>
              <IconButton href="#" sx={iconStyle}><LinkedInIcon /></IconButton>
              <IconButton href="#" sx={iconStyle}><InstagramIcon /></IconButton>
              <IconButton href="mailto:support@stockanalyzer.com" sx={iconStyle}><EmailIcon /></IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" sx={sectionHeading}>Quick Links</Typography>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/market">Market News</FooterLink>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" sx={sectionHeading}>Legal</Typography>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/disclaimer">Disclaimer</FooterLink>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={sectionHeading}>Stay Updated</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#b0bec5' }}>
              Get weekly insights on market trends and tips.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  flexGrow: 1,
                }}
              />
              <Button variant="contained" sx={{ backgroundColor: '#1E88E5' }}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Divider & Copyright */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="body2" align="center" sx={{ color: '#90A4AE' }}>
          © {new Date().getFullYear()} StockAnalyzer. All rights reserved. | Data powered by Yahoo Finance.
        </Typography>
      </Container>
    </Box>
  );
};

// Styled link component
const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    underline="none"
    sx={{
      display: 'block',
      color: '#cfd8dc',
      fontSize: '0.95rem',
      mb: 1,
      transition: '0.3s',
      '&:hover': {
        color: '#1E88E5',
        pl: 0.5,
      },
    }}
  >
    {children}
  </Link>
);

// Social icon button style
const iconStyle = {
  color: '#cfd8dc',
  '&:hover': {
    color: '#1E88E5',
  },
  mr: 1,
};

const sectionHeading = {
  color: '#ffffff',
  fontWeight: 'bold',
  mb: 2,
};

export default Footer;
