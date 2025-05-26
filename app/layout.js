// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import ReduxProvider from '../store/Provider';

// export const metadata = {
//   title: 'Task Manager',
//   description: 'Task board with CRUD, filters, MUI, Tailwind, Redux Toolkit',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>
//           {children}
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.js or app/RootLayout.jsx
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
