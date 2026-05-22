import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const locales = ['ar', 'en'];

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // إذا كانت اللغة غير مدعومة، نستخدم العربية كافتراضي
  const validLocale = locales.includes(locale) ? locale : 'ar';
  
  return (
    <html lang={validLocale} dir={validLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
