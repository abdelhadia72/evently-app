import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Events',
    links: [
      { label: 'Browse Events', href: '/dashboard/events' },
      { label: 'Create Event', href: '/dashboard' },
      { label: 'Event Planning', href: '/event-planning' },
      { label: 'Event Marketing', href: '/event-marketing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const LandingFooter = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Evently
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Making event planning and attendance easier for everyone. Join our community today.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ mb: 1 }}>
                    <MuiLink
                      component={Link}
                      href={link.href}
                      underline="hover"
                      color="text.secondary"
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      {link.label}
                    </MuiLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Evently. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingFooter;
