import React, { useState } from 'react';
import './registration.css';

export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const zeroState: User = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Registration = () => {
  const [user, setUser] = useState<User>(zeroState);

  const formValidCheck = () => {
      if (!user.username || !user.email || !user.password || !user.passwordConfirm) {
        alert("Please fill in all fields.");
        return false;
      }

      const pasRegex = /^(?=.*\p{L})(?=.*\d).{8,}$/u;
        if (!pasRegex.test(user.password)) {
          alert('Password must be at least 8 characters long and include at least one letter and one number.')
          return false;
        } 

      if (user.password !== user.passwordConfirm) {
        alert('Passwords do not match!');
        return false;
      }
      return true;
  };

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValidCheck()) return;

    console.log('User data:', user);
    setUser(zeroState);
  }

  const emailValidCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes('@') && user.username === '') {
      setUser({ 
        ...user, 
        email: e.target.value,
        username: e.target.value.split('@')[0] 
      });
    } else {
      setUser({ ...user, email: e.target.value });
    }
  };

  return (
    <div className="form-container">
      <form className="form-style" onSubmit={handleSubmit}>
        <input 
          className="input-field"
          placeholder='Email Address'
          type="email" 
          value={user.email} 
          onChange={emailValidCheck}
        /><br/>
      
        <input 
          className="input-field"
          placeholder='User Name'
          type="text" 
          value={user.username} 
          onChange={(e) => setUser({ ...user, username: e.target.value })} 
        /><br/>

        <input 
          className="input-field"
          placeholder='Password'
          type="password" 
          value={user.password} 
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        /><br/>

        <input 
          className="input-field"
          placeholder='Confirm Password'
          type="password" 
          value={user.passwordConfirm} 
          onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })} 
        /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
};

export default Registration;