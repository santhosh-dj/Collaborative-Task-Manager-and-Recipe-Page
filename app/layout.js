'use client';

import "./globals.css";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../store/queryClient';
import ReduxProvider from '../store/Provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
