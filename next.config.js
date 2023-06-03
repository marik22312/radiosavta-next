const withImages = require('next-images');
const { withSentryConfig } = require("@sentry/nextjs");

const configWithImages = withImages({
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
		disableStaticImages: true,
	},
	webpack(config) {
	  return config;
	},
	env: {
		BASE_API_URL: process.env.BASE_API_URL,
		SITE_LOGO_URL: process.env.SITE_LOGO_URL,
		NEXT_IMAGE_ALLOWED_DOMAINS: process.env.NEXT_IMAGE_ALLOWED_DOMAINS,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		MIXPANEL_API_KEY: process.env.MIXPANEL_API_KEY,
		CONTACT_NUMBER: process.env.CONTACT_NUMBER,
		FB_PIXEL_ID: process.env.FB_PIXEL_ID,
		RECAPTCA_KEY: process.env.RECAPTCA_KEY,
		SITE_OPEN_GRAPH_IMAGE: process.env.SITE_OPEN_GRAPH_IMAGE,
	}
  })

  module.exports = withSentryConfig(configWithImages);