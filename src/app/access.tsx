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
    <main className='flex min-h-screen items-center justify-center px-6 py-16'>
      <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-8 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_60%)]' />
          {/* Header Section */}
          <div className='text-center'>
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-secondary/25 px-4 py-2'>
              <span className='h-2 w-2 rounded-full bg-primary' />
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Access
              </span>
            </div>
            <h1 className='mt-8 text-3xl font-semibold tracking-tight text-foreground'>Welcome Back</h1>
            <p className='mt-3 text-sm text-muted-foreground'>
              Sign in to access the experience catalog.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            {/* Email Input */}
            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'
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
                className='w-full rounded-2xl border border-border/70 bg-background/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring'
                placeholder='username'
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor='password'
                className='mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'
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
                className='w-full rounded-2xl border border-border/70 bg-background/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring'
                placeholder='••••••••'
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className='rounded-2xl border border-destructive/40 bg-destructive/15 p-3 text-center text-sm font-medium text-destructive'>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring shadow-[0_10px_35px_rgba(56,189,248,0.25)]'
              >
                Sign In
              </button>
            </div>
          </form>
      </div>
    </main>
  );
};

export default LoginPage;
