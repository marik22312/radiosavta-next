const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,
  webpack5: false,
  images: {
	  domains: ['res.cloudinary.com']
  },
  webpack(config, options) {
    return config
  },
  inlineImageLimit: false,
  env: {
	  BASE_API_URL: process.env.BASE_API_URL
  }
})
