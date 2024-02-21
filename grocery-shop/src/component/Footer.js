import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <>
      <div class="bottom-0">
        <div class="bg-black  text-white py-4">
          <ul class="flex justify-evenly my-2 font-bold text-center text list-none">
            <li>Get to Know Us</li>
            <li>Connect with Us</li>
            <li>Let Us Help You</li>

          </ul>
          <div class="flex justify-evenly my-3">
            <ul class="space-y-2 list-none">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>home</li>
            </ul>
            <ul class="space-y-2 list-none">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
            <ul class="space-y-2 list-none">
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>Help</li>
            </ul>
          </div>
        </div>

      </div>
      {/* <AppBar position="static" color="secondary">
        <Container maxWidth="100">
          <Toolbar>
            <Grid>
              <Typography variant="body1" color="inherit">
                © {new Date().getFullYear()} Grocery Shop. All rights reserved.
              </Typography>
            </Grid>
            <Grid container justifyContent='flex-end'>
              <IconButton color='inherit' aria-label='instagram'>
                <Instagram />
              </IconButton>

              <IconButton color='inherit' aria-label='facebook'>
                <Facebook />
              </IconButton>

              <IconButton color='inherit' aria-label='twitter'>
                <Twitter />
              </IconButton>
            </Grid>
          </Toolbar>
        </Container>

      </AppBar> */}
    </>

  );
}

export default Footer;