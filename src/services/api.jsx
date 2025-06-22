
// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://rtsma-backend.onrender.com';


// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

// Generate fallback stock prediction data
const generateFallbackPrediction = (ticker) => {
  const basePrice = 50 + (ticker.charCodeAt(0) * 3);
  const history = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const randomChange = (Math.random() - 0.5) * 0.05;
    const price = basePrice * (1 + randomChange * i * 0.1);
    
    history.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(Math.max(price, 10).toFixed(2))
    });
  }
  
  return {
    ticker,
    predicted_price: parseFloat((basePrice * 1.05).toFixed(2)),
    history
  };
};

// Auth API calls
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

// Stock API calls with fallback
export const getStockPrediction = async (ticker) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/predict/${ticker}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn(`Backend unavailable for ${ticker}, using fallback data:`, error);
    
    // Return fallback data when backend is not available
    return generateFallbackPrediction(ticker);
  }
};

export const getStockSentiment = async (ticker) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/sentiment/${ticker}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn('Stock sentiment API error, using fallback:', error);
    
    // Return fallback sentiment data
    return {
      sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
      confidence: Math.random() * 0.4 + 0.6,
      score: Math.random() * 2 - 1
    };
  }
};

export const analyzeSentiment = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/analyze-sentiment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ text }),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn('Sentiment analysis API error, using fallback:', error);
    return {
      sentiment: Math.random() > 0.5 ? 'Positive' : 'Negative',
      confidence: Math.random() * 0.4 + 0.6,
      score: Math.random() * 2 - 1
    };
  }
};

// Portfolio API calls with fallback
export const getPortfolio = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn('Portfolio API error, using fallback data:', error);
    
    // Return fallback portfolio data
    return [
      { ticker: 'AAPL', price: 175.25, change: 2.5, sentiment: 'Positive', shares: 15 },
      { ticker: 'GOOGL', price: 2850.75, change: -1.2, sentiment: 'Neutral', shares: 5 },
      { ticker: 'MSFT', price: 380.50, change: 1.8, sentiment: 'Positive', shares: 12 },
      { ticker: 'TSLA', price: 220.30, change: -3.2, sentiment: 'Negative', shares: 8 },
      { ticker: 'AMZN', price: 145.80, change: 0.8, sentiment: 'Neutral', shares: 20 },
      { ticker: 'META', price: 325.40, change: 4.1, sentiment: 'Positive', shares: 10 }
    ];
  }
};

export const addToPortfolio = async (stock) => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(stock),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn('Add to portfolio API error:', error);
    // Return success message even if backend fails
    return { message: 'Stock added to portfolio (demo mode)', success: true };
  }
};

export const removeFromPortfolio = async (ticker) => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${ticker}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.warn('Remove from portfolio API error:', error);
    return { message: 'Stock removed from portfolio (demo mode)', success: true };
  }
};

// Profile API calls
export const getUserProfile = async (username) => {
  try {
    console.log(`Making API call to: ${API_BASE_URL}/auth/profile/${username}`);
    
    const response = await fetch(`${API_BASE_URL}/auth/profile/${username}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    console.log('API response data:', data);
    
    return data.user;
  } catch (error) {
    console.error('Get user profile API error:', error);
    throw error;
  }
};

export const getCurrentUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    return data.user;
  } catch (error) {
    console.error('Profile API error:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/debug/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Get all users API error:', error);
    throw error;
  }
};
