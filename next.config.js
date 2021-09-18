const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,
  webpack5: false,
  images: {
	  domains: ['res.cloudinary.com']
  },
  webpack(config) {
    return config;
  },
  inlineImageLimit: false,
  env: {
	  BASE_API_URL: process.env.BASE_API_URL,
	  NEXT_IMAGE_ALLOWED_DOMAINS: process.env.NEXT_IMAGE_ALLOWED_DOMAINS,
	  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
  }
})
