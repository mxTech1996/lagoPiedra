import { headers } from 'next/headers';
import Home from './home';
import LoginPage from './access';

export default function RootPage() {
  const headersList = headers();
  const host = headersList.get('host');
  const isAccessSite = host && host.startsWith('access.');

  if (isAccessSite) {
    return <LoginPage />;
  }

  return <Home />;
}
