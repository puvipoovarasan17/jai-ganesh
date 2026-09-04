export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/login'],
    },
    sitemap: 'https://jai-ganesh-platform.vercel.app/sitemap.xml',
  }
}
