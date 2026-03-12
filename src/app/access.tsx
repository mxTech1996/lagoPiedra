'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Array de usuarios como lo solicitaste.
const allowedUsers = [
  { user: 'julio', password: 'passwordJulio', products: '3,4' },
  { user: 'ana', password: 'passwordAna', products: '1,2' },
  { user: 'luis', password: 'passwordLuis', products: '5,6' },
  { user: 'maria', password: 'passwordMaria', products: '7,8' },
  { user: 'carlos', password: 'passwordCarlos', products: '3,7' },
  {
    user: 'sofia',
    password: 'passwordSofia',
    products: null,
    withAdditionals: true,
  },
  {
    user: 'pedro',
    password: 'passwordPedro',
    products: null,
    withAdditionals: true,
  },
  {
    user: 'JamesKelley',
    password: 'passwordJames',
  },
  {
    user: 'RichardLewis',
    password: 'passwordRichard',
    products: null,
    withAdditionals: true,
  },
  {
    user: 'CarlosAlonso',
    password: 'passwordCarlos',
    products: null,
    withAdditionals: true,
  },
  {
    user: 'julioCesar',
    password: 'passwordJulio',
  },
];

const LoginPage = () => {
  // 1. Hooks para manejar el estado y la navegación
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Lógica para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue

    // Busca si el usuario existe en el array
    const foundUser = allowedUsers.find((u) => u.user === username);

    // Valida si el usuario fue encontrado y si la contraseña es correcta
    if (foundUser && foundUser.password === password) {
      // Credenciales correctas
      setError(''); // Limpia cualquier error previo

      router.push('/products');
    } else {
      // Credenciales incorrectas
      setError('Invalid username or password.');
    }
  };

  return (
    <main>
      <main className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white border border-slate-200 text-slate-900 rounded-lg shadow-sm'>
          {/* Header Section */}
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Welcome Back</h1>
            <p className='mt-2 text-slate-500'>
              Please sign in to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            {/* Email Input */}
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-slate-700'
              >
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder:text-slate-400'
                placeholder='username'
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-slate-700'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder:text-slate-400'
                placeholder='••••••••'
              />
            </div>

            {/* Error Message */}
            {error && <div className='text-sm text-red-600 font-medium bg-red-50 p-3 rounded-md text-center border border-red-200'>{error}</div>}

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full px-4 py-3 font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-300 shadow-sm'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </main>
    </main>
  );
};

export default LoginPage;
