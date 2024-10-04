import { AppProvider } from '@toolpad/core';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';

export const NAVIGATION = [
  {
    segment: 'customers',
    title: 'Customers',
    icon: <GroupsIcon />,
  },
  {
    segment: 'companies',
    title: 'Companies',
    icon: <BusinessIcon />,
  },
];

export const BRANDING = {
  title: 'GGS'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            {children}
          </AppProvider>
        </AppRouterCacheProvider>     
      </body>
    </html>
  );
}
