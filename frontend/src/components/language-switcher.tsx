'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };
  return (
    <button onClick={toggleLocale} className="p-2 text-sm font-medium">
      {locale === 'ar' ? 'EN' : 'AR'}
    </button>
  );
}