// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { useRouter } from 'next/router';


// const defaultTheme = createTheme();

// const Login = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get('http://localhost:4000/users');
//       const users = response.data;
//       const user = users.find(user => user.email === email && user.password === password)


//       if (user) {
//         console.log('Login successful:', user)
//         alert('Login successful')
//         router.push('/');
//       }
//       else {
//         setError('Invalid Email or password')
//         alert('Invalid email or password. Please try again.')

//       }
//     } catch (error) {
//       console.error("Login error", error)
//       setError('Login failed. Please try again later.')
//       alert('Login failed. Please try again later.')

//     }
//   }

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             // backgroundImage: 'url(`public\photos\flat-lay-bunch-fresh-provisions-donation_23-2148733838.avif`)'
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Grid>

//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Submit
//             </Button>
//             <Grid container justifyContent="flex-end">
//               {error && <Typography color="error">{error}</Typography>}
//               <Grid container justifyContent='flex-end'>
//                 <Grid item>
//                   <Link href="register" variant="body2">
//                     Already have an account? Register
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   )
// }

// export default Login
