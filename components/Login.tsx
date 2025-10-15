'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mockData';

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay for realistic effect
    setTimeout(() => {
      // In this POC, any credentials will work, but we'll use the first user if no match
      const user = MOCK_USERS.find(
        u => u.username === username && u.password === password
      ) || MOCK_USERS[0];

      onLogin(user);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3" style={{ color: '#1e3a5f' }}>
            Kinesiotherapy
          </h1>
          <p className="text-xl" style={{ color: '#4a90e2' }}>
            Patient Management System
          </p>
        </div>

        <div
          className="rounded-2xl shadow-2xl p-8"
          style={{ backgroundColor: '#ffffff' }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#1e3a5f' }}>
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
                style={{ color: '#1e3a5f' }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  borderColor: '#4a90e2',
                  backgroundColor: '#f0f8ff'
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: '#1e3a5f' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  borderColor: '#4a90e2',
                  backgroundColor: '#f0f8ff'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white text-lg transition-opacity hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: '#4a90e2' }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#e3f2fd' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>
              Demo Credentials:
            </p>
            <div className="text-sm space-y-1" style={{ color: '#4a90e2' }}>
              <p><strong>Doctors:</strong> dr.johnson, dr.chen, dr.rodriguez</p>
              <p><strong>Physiotherapists:</strong> pt.anderson, pt.williams</p>
              <p><strong>Password:</strong> password (or any text)</p>
              <p className="text-xs mt-2" style={{ color: '#64b5f6' }}>
                * Any credentials will work for this demo
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: '#64b5f6' }}>
          A demonstration of patient flow management for rehabilitation clinics
        </p>
      </div>
    </div>
  );
}
