/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // تعطيل i18n الثابت (سنستخدم next-intl فقط)
  i18n: undefined,
};

module.exports = nextConfig;
