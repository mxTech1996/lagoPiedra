'use client';
import { MainProvider } from 'ui-old-version';
import { dataSite } from '@/lib/data';

const Provider = ({ children }) => {
  return (
    <MainProvider
      products={dataSite.products}
      locale={'en'}
      colorPrimary={'#2792f0'}
    >
      {children}
    </MainProvider>
  );
};

export default Provider;
