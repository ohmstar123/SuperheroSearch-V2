import React, { useState } from 'react';
import "./Login.css";

const Login = () => {
  // setting up the use states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // function to handle the login
  const handleLogin = () => {
    // Simulate login logic - replace with actual authentication logic
    alert(`Login: Email - ${email}, Password - ${password}`);
  };

  //  function to handle the signup
  const handleSignup = () => {
    // Simulate signup logic - replace with actual user registration logic
    alert(`Signup: Email - ${email}, Password - ${password}, Nickname - ${nickname}`);
  };

  // jsx for the login page
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <h2>Signup</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        {/* Render the nickname field only in the signup section */}
        <label>
          Nickname:
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

// export the login page
export default Login;