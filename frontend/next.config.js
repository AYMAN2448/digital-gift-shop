/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // تحديد مسار ملف إعدادات next-intl صراحةً
  experimental: {
    // هذا قد يساعد في حل مشكلة العثور على الإعدادات
  },
};

module.exports = nextConfig;
