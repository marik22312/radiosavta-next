const withImages = require('next-images')

module.exports = withImages({
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
		disableStaticImages: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.worker\.js$/,
			loader: 'worker-loader',
			// options: { inline: true }, // also works
			options: {
			  name: 'static/[hash].worker.js',
			  publicPath: '/_next/',
			},
		  });
		  return config
	  return config;
	},
	env: {
		BASE_API_URL: process.env.BASE_API_URL,
		NEXT_IMAGE_ALLOWED_DOMAINS: process.env.NEXT_IMAGE_ALLOWED_DOMAINS,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		MIXPANEL_API_KEY: process.env.MIXPANEL_API_KEY,
		CONTACT_NUMBER: process.env.CONTACT_NUMBER,
		FB_PIXEL_ID: process.env.FB_PIXEL_ID,
	}
  })
