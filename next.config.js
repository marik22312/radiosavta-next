const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,
  webpack5: false,
  webpack(config, options) {
    return config
  },
  env: {
	  BASE_API_URL: process.env.BASE_API_URL
  }
})
