import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations';

const LoginScreen = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(REGISTER_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const { data } = await register({ variables: formData });
        onLogin(data.registerUser.token);
      } else {
        const { data } = await login({ variables: { email: formData.email, password: formData.password } });
        onLogin(data.loginUser.token);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
      </button>
    </div>
  );
};

export default LoginScreen;
