// // import { Alert, Avatar, Box, Button, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material';
// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getAllUsers, getUserProfile } from '../services/api';
// // import { stringAvatar } from '../utils/avatarColors.js';

// // const ProfilePage = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [debugInfo, setDebugInfo] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       try {
// //         // Get username from localStorage
// //         let username = null;
        
// //         // Try to get from 'user' key first (as it contains the correct data)
// //         const userStr = localStorage.getItem('user');
// //         if (userStr && userStr !== 'null') {
// //           try {
// //             const userObj = JSON.parse(userStr);
// //             username = userObj.username;
// //             console.log('Username extracted from user object:', username);
// //           } catch (parseError) {
// //             console.error('Error parsing user object:', parseError);
// //           }
// //         }
        
// //         // Fallback to direct username key
// //         if (!username) {
// //           username = localStorage.getItem('username');
// //         }

// //         console.log('Final username for API call:', username);
        
// //         // Check if username exists and is valid
// //         if (!username || username === 'null' || username === 'undefined' || username.trim() === '') {
// //           console.warn('No valid username found');
          
// //           // For debugging, let's see what's in localStorage
// //           const debugData = {
// //             localStorage_keys: Object.keys(localStorage),
// //             user: localStorage.getItem('user'),
// //             username: localStorage.getItem('username'),
// //             token: localStorage.getItem('token') ? 'exists' : 'missing'
// //           };
// //           setDebugInfo(debugData);
          
// //           setError('No user session found. Please log in.');
// //           setLoading(false);
// //           return;
// //         }

// //         // Fetch user profile from backend
// //         console.log('Calling getUserProfile API with username:', username);
// //         const profileData = await getUserProfile(username);
        
// //         console.log('Profile data received:', profileData);
        
// //         if (!profileData) {
// //           setError('User profile not found in database.');
// //           setLoading(false);
// //           return;
// //         }

// //         setUserData(profileData);
// //         setError('');
        
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
        
// //         // Handle different types of errors
// //         if (err.message.includes('not found')) {
// //           // For debugging, let's get all users to see what's available
// //           try {
// //             const allUsersResponse = await getAllUsers();
// //             const availableUsernames = allUsersResponse.users?.map(u => u.username) || [];
// //             setError(`User not found. Available users: ${availableUsernames.join(', ')}`);
// //           } catch (debugErr) {
// //             setError(`User not found: ${err.message}`);
// //           }
// //         } else if (err.message.includes('Server error') || err.message.includes('500')) {
// //           setError('Server error occurred. The backend may be down or there\'s a database issue.');
// //         } else if (err.message.includes('404')) {
// //           setError('User profile not found.');
// //         } else if (err.message.includes('401')) {
// //           setError('Authentication failed. Please log in again.');
// //           setTimeout(() => {
// //             localStorage.clear();
// //             navigate('/login');
// //           }, 3000);
// //         } else {
// //           setError(`Failed to load user profile: ${err.message || 'Unknown error'}`);
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [navigate]);

// //   // Handle login redirect
// //   const handleLoginRedirect = () => {
// //     localStorage.clear();
// //     navigate('/login');
// //   };

// //   // Handle refresh
// //   const handleRefresh = () => {
// //     setLoading(true);
// //     setError('');
// //     setUserData(null);
// //     window.location.reload();
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <Container maxWidth="sm" sx={{ mt: 6 }}>
// //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
// //           <CircularProgress size={60} />
// //           <Typography variant="body1" sx={{ ml: 2 }}>
// //             Loading profile...
// //           </Typography>
// //         </Box>
// //       </Container>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <Container maxWidth="sm" sx={{ mt: 6 }}>
// //         <Alert severity="error" sx={{ mb: 2 }}>
// //           {error}
// //         </Alert>
        
// //         {/* Debug info in development */}
// //         {debugInfo && process.env.NODE_ENV === 'development' && (
// //           <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
// //             <Typography variant="caption" component="div">
// //               <strong>Debug Info:</strong>
// //               <pre style={{ fontSize: '10px', margin: '8px 0' }}>
// //                 {JSON.stringify(debugInfo, null, 2)}
// //               </pre>
// //             </Typography>
// //           </Box>
// //         )}
        
// //         <Box textAlign="center">
// //           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //             {error.includes('Server error') 
// //               ? 'Please check if the backend server is running and try again.'
// //               : 'Please try logging in again to access your profile.'
// //             }
// //           </Typography>
// //           <Button 
// //             variant="contained" 
// //             color="primary" 
// //             onClick={handleLoginRedirect}
// //             sx={{ mr: 2 }}
// //           >
// //             Go to Login
// //           </Button>
// //           <Button 
// //             variant="outlined" 
// //             onClick={handleRefresh}
// //           >
// //             Refresh Page
// //           </Button>
// //         </Box>
// //       </Container>
// //     );
// //   }

// //   // No user data state
// //   if (!userData) {
// //     return (
// //       <Container maxWidth="sm" sx={{ mt: 6 }}>
// //         <Alert severity="warning" sx={{ mb: 2 }}>
// //           No user data available.
// //         </Alert>
// //         <Box textAlign="center">
// //           <Button 
// //             variant="contained" 
// //             color="primary" 
// //             onClick={handleLoginRedirect}
// //           >
// //             Go to Login
// //           </Button>
// //         </Box>
// //       </Container>
// //     );
// //   }

// //   // Format the join date safely
// //   const formatJoinDate = (dateString) => {
// //     try {
// //       if (!dateString) return 'Unknown';
// //       const date = new Date(dateString);
// //       return isNaN(date.getTime()) ? 'Unknown' : date.toDateString();
// //     } catch (error) {
// //       console.error('Error formatting date:', error);
// //       return 'Unknown';
// //     }
// //   };

// //   // Main profile display
// //   return (
// //     <Container maxWidth="sm" sx={{ mt: 6 }}>
// //       <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
// //         {/* User Avatar */}
// //         <Avatar 
// //           {...stringAvatar(userData.username || userData.full_name || 'User')} 
// //           sx={{ width: 80, height: 80, mx: 'auto', fontSize: '2rem' }}
// //         />

// //         {/* User Name */}
// //         <Typography variant="h4" mt={2} fontWeight="bold">
// //           {userData.full_name || userData.username || 'Unknown User'}
// //         </Typography>

// //         {/* Username */}
// //         <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
// //           @{userData.username || 'unknown'}
// //         </Typography>

// //         <Divider sx={{ my: 3 }} />

// //         {/* User Details */}
// //         <Box textAlign="left" sx={{ px: 2 }}>
// //           <Typography variant="body1" sx={{ mb: 2 }}>
// //             <strong>Email:</strong> {userData.email || 'Not provided'}
// //           </Typography>
          
// //           <Typography variant="body1" sx={{ mb: 2 }}>
// //             <strong>User ID:</strong> {userData.id || 'Unknown'}
// //           </Typography>
          
// //           <Typography variant="body1" sx={{ mb: 2 }}>
// //             <strong>Joined:</strong> {formatJoinDate(userData.created_at || userData.join_date || userData.createdAt)}
// //           </Typography>

// //           {userData.phone && (
// //             <Typography variant="body1" sx={{ mb: 2 }}>
// //               <strong>Phone:</strong> {userData.phone}
// //             </Typography>
// //           )}

// //           {userData.location && (
// //             <Typography variant="body1" sx={{ mb: 2 }}>
// //               <strong>Location:</strong> {userData.location}
// //             </Typography>
// //           )}

// //           {userData.bio && (
// //             <Typography variant="body1" sx={{ mb: 2 }}>
// //               <strong>Bio:</strong> {userData.bio}
// //             </Typography>
// //           )}
// //         </Box>

// //         <Divider sx={{ my: 3 }} />

// //         {/* Action Buttons */}
// //         <Box sx={{ mb: 2 }}>
// //           <Button 
// //             variant="outlined" 
// //             onClick={handleRefresh}
// //             sx={{ mr: 2 }}
// //           >
// //             Refresh Profile
// //           </Button>
// //           <Button 
// //             variant="outlined" 
// //             color="secondary"
// //             onClick={handleLoginRedirect}
// //           >
// //             Logout
// //           </Button>
// //         </Box>

// //         <Typography variant="caption" color="text.secondary">
// //           GitHub-style read-only profile
// //         </Typography>

// //         {/* Debug info in development */}
// //         {process.env.NODE_ENV === 'development' && userData && (
// //           <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
// //             <Typography variant="caption" component="div" sx={{ textAlign: 'left' }}>
// //               <strong>Debug Info:</strong>
// //               <pre style={{ fontSize: '10px', margin: '8px 0', whiteSpace: 'pre-wrap' }}>
// //                 {JSON.stringify({
// //                   localStorage: {
// //                     username: localStorage.getItem('username'),
// //                     user: localStorage.getItem('user'),
// //                     token: localStorage.getItem('token') ? 'exists' : 'missing'
// //                   },
// //                   userData: userData
// //                 }, null, 2)}
// //               </pre>
// //             </Typography>
// //           </Box>
// //         )}
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default ProfilePage;





// import { Alert, Avatar, Box, Button, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserProfile, getAllUsers } from '../services/api';
// import { stringAvatar } from '../utils/avatarColors.js';

// const ProfilePage = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [debugInfo, setDebugInfo] = useState(null);
//   const [rawApiResponse, setRawApiResponse] = useState(null); // Add this for debugging
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         // Get username from localStorage
//         let username = null;
        
//         // Try to get from 'user' key first (as it contains the correct data)
//         const userStr = localStorage.getItem('user');
//         if (userStr && userStr !== 'null') {
//           try {
//             const userObj = JSON.parse(userStr);
//             username = userObj.username;
//             console.log('Username extracted from user object:', username);
//           } catch (parseError) {
//             console.error('Error parsing user object:', parseError);
//           }
//         }
        
//         // Fallback to direct username key
//         if (!username) {
//           username = localStorage.getItem('username');
//         }

//         console.log('Final username for API call:', username);
        
//         // Check if username exists and is valid
//         if (!username || username === 'null' || username === 'undefined' || username.trim() === '') {
//           console.warn('No valid username found');
          
//           // For debugging, let's see what's in localStorage
//           const debugData = {
//             localStorage_keys: Object.keys(localStorage),
//             user: localStorage.getItem('user'),
//             username: localStorage.getItem('username'),
//             token: localStorage.getItem('token') ? 'exists' : 'missing'
//           };
//           setDebugInfo(debugData);
          
//           setError('No user session found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         // Fetch user profile from backend
//         console.log('Calling getUserProfile API with username:', username);
//         const profileData = await getUserProfile(username);
        
//         console.log('Profile data received:', profileData);
//         console.log('Profile data type:', typeof profileData);
//         console.log('Profile data keys:', profileData ? Object.keys(profileData) : 'null');
        
//         // Store raw response for debugging
//         setRawApiResponse(profileData);
        
//         if (!profileData) {
//           setError('User profile not found in database.');
//           setLoading(false);
//           return;
//         }

//         setUserData(profileData);
//         setError('');
        
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
        
//         // Handle different types of errors
//         if (err.message.includes('not found')) {
//           // For debugging, let's get all users to see what's available
//           try {
//             const allUsersResponse = await getAllUsers();
//             const availableUsernames = allUsersResponse.users?.map(u => u.username) || [];
//             setError(`User not found. Available users: ${availableUsernames.join(', ')}`);
//           } catch (debugErr) {
//             setError(`User not found: ${err.message}`);
//           }
//         } else if (err.message.includes('Server error') || err.message.includes('500')) {
//           setError('Server error occurred. The backend may be down or there\'s a database issue.');
//         } else if (err.message.includes('404')) {
//           setError('User profile not found.');
//         } else if (err.message.includes('401')) {
//           setError('Authentication failed. Please log in again.');
//           setTimeout(() => {
//             localStorage.clear();
//             navigate('/login');
//           }, 3000);
//         } else {
//           setError(`Failed to load user profile: ${err.message || 'Unknown error'}`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   // Handle login redirect
//   const handleLoginRedirect = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     setLoading(true);
//     setError('');
//     setUserData(null);
//     setRawApiResponse(null);
//     window.location.reload();
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 6 }}>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress size={60} />
//           <Typography variant="body1" sx={{ ml: 2 }}>
//             Loading profile...
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 6 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
        
//         {/* Debug info in development */}
//         {debugInfo && (
//           <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
//             <Typography variant="caption" component="div">
//               <strong>Debug Info:</strong>
//               <pre style={{ fontSize: '10px', margin: '8px 0' }}>
//                 {JSON.stringify(debugInfo, null, 2)}
//               </pre>
//             </Typography>
//           </Box>
//         )}
        
//         <Box textAlign="center">
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             {error.includes('Server error') 
//               ? 'Please check if the backend server is running and try again.'
//               : 'Please try logging in again to access your profile.'
//             }
//           </Typography>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={handleLoginRedirect}
//             sx={{ mr: 2 }}
//           >
//             Go to Login
//           </Button>
//           <Button 
//             variant="outlined" 
//             onClick={handleRefresh}
//           >
//             Refresh Page
//           </Button>
//         </Box>
//       </Container>
//     );
//   }

//   // Format the join date safely
//   const formatJoinDate = (dateString) => {
//     try {
//       if (!dateString) return 'Unknown';
//       const date = new Date(dateString);
//       return isNaN(date.getTime()) ? 'Unknown' : date.toDateString();
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Unknown';
//     }
//   };

//   // Check if userData is empty or null
//   if (!userData || Object.keys(userData).length === 0) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 6 }}>
//         <Alert severity="warning" sx={{ mb: 2 }}>
//           No user data available or user data is empty.
//         </Alert>
        
//         {/* Show raw API response for debugging */}
//         <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
//           <Typography variant="caption" component="div">
//             <strong>Raw API Response:</strong>
//             <pre style={{ fontSize: '10px', margin: '8px 0' }}>
//               {JSON.stringify(rawApiResponse, null, 2)}
//             </pre>
//           </Typography>
//         </Box>
        
//         <Box textAlign="center">
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={handleLoginRedirect}
//           >
//             Go to Login
//           </Button>
//         </Box>
//       </Container>
//     );
//   }

//   // Main profile display
//   return (
//     <Container maxWidth="sm" sx={{ mt: 6 }}>
//       <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
//         {/* User Avatar */}
//         <Avatar 
//           {...stringAvatar(userData.username || userData.full_name || 'User')} 
//           sx={{ width: 80, height: 80, mx: 'auto', fontSize: '2rem' }}
//         />

//         {/* User Name */}
//         <Typography variant="h4" mt={2} fontWeight="bold">
//           {userData.full_name || userData.username || 'Unknown User'}
//         </Typography>

//         {/* Username */}
//         <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
//           @{userData.username || 'unknown'}
//         </Typography>

//         <Divider sx={{ my: 3 }} />

//         {/* User Details */}
//         <Box textAlign="left" sx={{ px: 2 }}>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             <strong>Email:</strong> {userData.email || 'Not provided'}
//           </Typography>
          
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             <strong>User ID:</strong> {userData.id || 'Unknown'}
//           </Typography>
          
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             <strong>Joined:</strong> {formatJoinDate(userData.created_at || userData.join_date || userData.createdAt)}
//           </Typography>

//           {userData.phone && (
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               <strong>Phone:</strong> {userData.phone}
//             </Typography>
//           )}

//           {userData.location && (
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               <strong>Location:</strong> {userData.location}
//             </Typography>
//           )}

//           {userData.bio && (
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               <strong>Bio:</strong> {userData.bio}
//             </Typography>
//           )}
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         {/* Action Buttons */}
//         <Box sx={{ mb: 2 }}>
//           <Button 
//             variant="outlined" 
//             onClick={handleRefresh}
//             sx={{ mr: 2 }}
//           >
//             Refresh Profile
//           </Button>
//           <Button 
//             variant="outlined" 
//             color="secondary"
//             onClick={handleLoginRedirect}
//           >
//             Logout
//           </Button>
//         </Box>

//         <Typography variant="caption" color="text.secondary">
//           GitHub-style read-only profile
//         </Typography>

//         {/* Always show debug info for now */}
//         <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
//           <Typography variant="caption" component="div" sx={{ textAlign: 'left' }}>
//             <strong>Debug Info:</strong>
//             <pre style={{ fontSize: '10px', margin: '8px 0', whiteSpace: 'pre-wrap' }}>
//               {JSON.stringify({
//                 localStorage: {
//                   username: localStorage.getItem('username'),
//                   user: localStorage.getItem('user'),
//                   token: localStorage.getItem('token') ? 'exists' : 'missing'
//                 },
//                 rawApiResponse: rawApiResponse,
//                 userData: userData,
//                 userDataKeys: userData ? Object.keys(userData) : 'null',
//                 userDataType: typeof userData
//               }, null, 2)}
//             </pre>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfilePage;




import { Alert, Avatar, Box, Button, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getUserProfile } from '../services/api';
import { stringAvatar } from '../utils/avatarColors.js';
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);
  const [rawApiResponse, setRawApiResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get username from localStorage
        let username = null;
        
        // Try to get from 'user' key first (as it contains the correct data)
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== 'null') {
          try {
            const userObj = JSON.parse(userStr);
            username = userObj.username;
            console.log('Username extracted from user object:', username);
          } catch (parseError) {
            console.error('Error parsing user object:', parseError);
          }
        }
        
        // Fallback to direct username key
        if (!username) {
          username = localStorage.getItem('username');
        }

        console.log('Final username for API call:', username);
        
        // Check if username exists and is valid
        if (!username || username === 'null' || username === 'undefined' || username.trim() === '') {
          console.warn('No valid username found');
          
          const debugData = {
            localStorage_keys: Object.keys(localStorage),
            user: localStorage.getItem('user'),
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token') ? 'exists' : 'missing'
          };
          setDebugInfo(debugData);
          
          setError('No user session found. Please log in.');
          setLoading(false);
          return;
        }

        // Fetch user profile from backend
        console.log('Calling getUserProfile API with username:', username);
        const profileData = await getUserProfile(username);
        
        console.log('Profile data received:', profileData);
        console.log('Profile data type:', typeof profileData);
        console.log('Profile data keys:', profileData ? Object.keys(profileData) : 'null');
        
        // Store raw response for debugging
        setRawApiResponse(profileData);
        
        if (!profileData) {
          setError('User profile not found in database.');
          setLoading(false);
          return;
        }

        setUserData(profileData);
        setError('');
        
      } catch (err) {
        console.error('Error fetching user profile:', err);
        
        // Handle different types of errors
        if (err.message.includes('not found')) {
          try {
            const allUsersResponse = await getAllUsers();
            const availableUsernames = allUsersResponse.users?.map(u => u.username) || [];
            setError(`User not found. Available users: ${availableUsernames.join(', ')}`);
          } catch (debugErr) {
            setError(`User not found: ${err.message}`);
          }
        } else if (err.message.includes('Server error') || err.message.includes('500')) {
          setError('Server error occurred. The backend may be down or there\'s a database issue.');
        } else if (err.message.includes('404')) {
          setError('User profile not found.');
        } else if (err.message.includes('401')) {
          setError('Authentication failed. Please log in again.');
          setTimeout(() => {
            localStorage.clear();
            navigate('/login');
          }, 3000);
        } else {
          setError(`Failed to load user profile: ${err.message || 'Unknown error'}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle login redirect
  const handleLoginRedirect = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setError('');
    setUserData(null);
    setRawApiResponse(null);
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        
        {debugInfo && process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" component="div">
              <strong>Debug Info:</strong>
              <pre style={{ fontSize: '10px', margin: '8px 0' }}>
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </Typography>
          </Box>
        )}
        
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {error.includes('Server error') 
              ? 'Please check if the backend server is running and try again.'
              : 'Please try logging in again to access your profile.'
            }
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoginRedirect}
            sx={{ mr: 2 }}
          >
            Go to Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleRefresh}
          >
            Refresh Page
          </Button>
        </Box>
      </Container>
    );
  }

  // Format the join date safely
  const formatJoinDate = (dateString) => {
    try {
      if (!dateString) return 'Unknown';
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Unknown' : date.toDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown';
    }
  };

  // Check if userData is empty or null
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          No user data available or user data is empty.
        </Alert>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" component="div">
            <strong>Raw API Response:</strong>
            <pre style={{ fontSize: '10px', margin: '8px 0' }}>
              {JSON.stringify(rawApiResponse, null, 2)}
            </pre>
          </Typography>
        </Box>
        
        <Box textAlign="center">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoginRedirect}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  // Get the display name for avatar
  const getDisplayName = () => {
    return userData.full_name || userData.username || userData.name || 'User';
  };

  // Main profile display
//   return (
//     <Container maxWidth="sm" sx={{ mt: 6 }}>
//       <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
//         {/* User Avatar - Large version with character initials */}
//         <Box sx={{ mb: 3 }}>
//           <Avatar 
//             {...stringAvatar(getDisplayName())}
//             sx={{ 
//               width: 120, 
//               height: 120, 
//               mx: 'auto', 
//               fontSize: '3rem',
//               fontWeight: 'bold',
//               border: '4px solid #f0f0f0',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//               color: 'white',
//               textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
//             }}
//           />
//         </Box>

//         {/* User Name */}
//         <Typography variant="h4" mt={2} fontWeight="bold" color="primary">
//           {userData.full_name || userData.username || 'Unknown User'}
//         </Typography>

//         {/* Username */}
//         <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
//           @{userData.username || 'unknown'}
//         </Typography>

//         <Divider sx={{ my: 3 }} />

//         {/* User Details */}
//         <Box textAlign="left" sx={{ px: 2 }}>
//           <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//             <strong style={{ minWidth: '80px', display: 'inline-block' }}>Email:</strong> 
//             <span>{userData.email || 'Not provided'}</span>
//           </Typography>
          
//           <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//             <strong style={{ minWidth: '80px', display: 'inline-block' }}>User ID:</strong> 
//             <span>{userData.id || 'Unknown'}</span>
//           </Typography>
          
//           <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//             <strong style={{ minWidth: '80px', display: 'inline-block' }}>Joined:</strong> 
//             <span>{formatJoinDate(userData.created_at || userData.join_date || userData.createdAt)}</span>
//           </Typography>

//           {userData.phone && (
//             <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//               <strong style={{ minWidth: '80px', display: 'inline-block' }}>Phone:</strong> 
//               <span>{userData.phone}</span>
//             </Typography>
//           )}

//           {userData.location && (
//             <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//               <strong style={{ minWidth: '80px', display: 'inline-block' }}>Location:</strong> 
//               <span>{userData.location}</span>
//             </Typography>
//           )}

//           {userData.bio && (
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               <strong>Bio:</strong> 
//               <br />
//               <span style={{ fontStyle: 'italic' }}>{userData.bio}</span>
//             </Typography>
//           )}
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         {/* Action Buttons */}
//         <Box sx={{ mb: 2 }}>
//           <Button 
//             variant="outlined" 
//             onClick={handleRefresh}
//             sx={{ mr: 2 }}
//           >
//             Refresh Profile
//           </Button>
//           <Button 
//             variant="outlined" 
//             color="secondary"
//             onClick={handleLoginRedirect}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// return (
//   <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
//     <Paper
//       elevation={6}
//       sx={{
//         p: 5,
//         borderRadius: 4,
//         backgroundColor: '#ffffff',
//         boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
//       }}
//     >
//       {/* Avatar */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
//         <Avatar
//           {...stringAvatar(getDisplayName())}
//           sx={{
//             width: 120,
//             height: 120,
//             fontSize: '3rem',
//             fontWeight: 'bold',
//             border: '4px solid #e0e0e0',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//             color: 'white',
//             backgroundColor: '#2196f3',
//           }}
//         />
//       </Box>

//       {/* Name & Username */}
//       <Typography variant="h4" align="center" fontWeight="bold" color="primary">
//         {userData.full_name || userData.username || 'Unknown User'}
//       </Typography>
//       <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mt: 1 }}>
//         @{userData.username || 'unknown'}
//       </Typography>

//       <Divider sx={{ my: 4 }} />

//       {/* Info Section */}
//       <Box sx={{ px: 2 }}>
//         {[
//           { label: 'Email', value: userData.email },
//           { label: 'User ID', value: userData.id },
//           { label: 'Joined', value: formatJoinDate(userData.created_at || userData.join_date || userData.createdAt) },
//           { label: 'Phone', value: userData.phone },
//           { label: 'Location', value: userData.location },
//         ].map(
//           (item) =>
//             item.value && (
//               <Typography
//                 key={item.label}
//                 variant="body1"
//                 sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
//               >
//                 <strong style={{ minWidth: '90px' }}>{item.label}:</strong>{' '}
//                 <span>{item.value}</span>
//               </Typography>
//             )
//         )}

//         {userData.bio && (
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             <strong>Bio:</strong>
//             <br />
//             <span style={{ fontStyle: 'italic' }}>{userData.bio}</span>
//           </Typography>
//         )}
//       </Box>

//       <Divider sx={{ my: 4 }} />

//       {/* Actions */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//         <Button variant="contained" onClick={handleRefresh}>
//           Refresh Profile
//         </Button>
//         <Button variant="outlined" color="secondary" onClick={handleLoginRedirect}>
//           Logout
//         </Button>
//       </Box>
//     </Paper>
//   </Container>
// );}




// ///////////////////////////////




  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 10,
        mb: 10,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: '20px',
          background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Avatar */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            {...stringAvatar(getDisplayName())}
            sx={{
              width: 130,
              height: 130,
              fontSize: '3.5rem',
              fontWeight: 'bold',
              mx: 'auto',
              border: '5px solid white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              backgroundColor: '#1976d2',
              color: '#fff',
            }}
          />
        </Box>

        {/* Full Name */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          {userData.full_name || userData.username || 'Unknown User'}
        </Typography>

        {/* Username */}
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          @{userData.username || 'unknown'}
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Info List */}
        <Box sx={{ px: { xs: 0, sm: 4 } }}>
          {[
            { label: 'Email', value: userData.email },
            { label: 'User ID', value: userData.id },
            {
              label: 'Joined',
              value: formatJoinDate(
                userData.created_at || userData.join_date || userData.createdAt
              ),
            },
            { label: 'Phone', value: userData.phone },
            { label: 'Location', value: userData.location },
          ]
            .filter((item) => item.value)
            .map((item) => (
              <Typography
                key={item.label}
                variant="body1"
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#333',
                }}
              >
                <strong>{item.label}:</strong>
                <span>{item.value}</span>
              </Typography>
            ))}

          {/* Bio */}
          {userData.bio && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" fontWeight="bold">
                Bio:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: '#555',
                  mt: 1,
                }}
              >
                {userData.bio}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button variant="contained" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleLoginRedirect}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
