'use client';

import Link from "next/link";
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Fix for button & login process
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Login successful');
      // redirect to homepage or dashboard
      window.location.href = '/';
    } else {
      console.error('❌', data.error);
    }
  } catch (err) {
    console.error('❌ Login failed', err);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-end text-black">
            Log In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded text-black"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded text-black"
          required
        />

  <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Log In
</button>
   <div className="text-blue-600 text-end"><Link href="/forgot">Forgot password?</Link></div> 
   <div className="text-end justify-end flex"><h2 className="text-black">Not have an account?</h2><Link className="text-blue-600"href="/signup">Create New.</Link></div>
        
      </form>
    </div>
  );
}
