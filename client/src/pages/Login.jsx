import '../css/Auth.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import libraryWay from '/assets/libraryWay.jpg';
import { LOGIN } from '../graphql/mutations.js';
import { useMutation } from '@apollo/client';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { loginuser: { username, password } },
      });

      // Save token and user info in localStorage
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('userId', data.login.userId);
      localStorage.setItem('role', data.login.role);

      // Set expiry for token (5 hours from now)
      const expiryDate = new Date(Date.now() + 5 * 60 * 60 * 1000);
      localStorage.setItem('expiryDate', expiryDate.toString());

      navigate('/home');
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className="login">
      <img
        className="LibraryWay"
        src={libraryWay}
        width={480}
        height={620}
        loading="lazy"
        alt="Library Way"
      />
      <div className="form">
        <h1 className="title">Login</h1>
        {error && <p className="errorMsg">Incorrect username or password</p>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '35px', paddingTop: '30px' }}>
            <label htmlFor="username" style={{ color: '#070C70', fontSize: '25px' }}>
              Username
            </label>
            <br />
            <input
              type="text"
              className="info"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ margin: '35px 0' }}>
            <label htmlFor="password" style={{ color: '#070C70', fontSize: '25px' }}>
              Password
            </label>
            <br />
            <input
              type="password"
              className="info"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            {!loading ? (
              <button type="submit">Login Account</button>
            ) : (
              <button type="submit" disabled>
                Loading...
              </button>
            )}
          </div>
          <button
            type="button"
            style={{
              backgroundColor: '#070C70',
              marginTop: '15px',
              color: '#ff1493',
              borderColor: '#ff1493',
            }}
          >
            Forget password
          </button>
        </form>
        <div className="acc">
          <p style={{ color: '#070C70' }}>Dont have an account?</p>
          <Link to="/signup" className="form-link" onClick={() => window.scrollTo(0, 0)}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
