'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset! Redirecting to login...");
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-white text-black">
      <h2 className="text-xl font-bold">Reset Password</h2>
      
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="p-2 border rounded text-black"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="p-2 border rounded text-black"
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
