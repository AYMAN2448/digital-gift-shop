import './globals.css';
import { Providers } from '@/components/providers';
import { getLocale } from 'next-intl/server';

export const metadata = {
  title: 'GiftShop | شحن وبطاقات رقمية',
  description: 'أسرع منصة لشراء بطاقات Google Play, Steam, وشحن الألعاب',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
