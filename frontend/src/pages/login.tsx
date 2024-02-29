'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', { 
            email, 
            password, 
            redirect: false 
        });
        if (result.error) {
            console.log('Login failed: ', result.error);
            // Consider setting an error state here and showing it to the user
        } else {
            window.location.href = '/protected'; // Redirect can be handled here if redirect: false
        }
    };


    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
