const withImages = require('next-images');
const { withSentryConfig } = require("@sentry/nextjs");
const { execSync } = require("child_process");

// Amplify exposes the deployed commit as AWS_COMMIT_ID; fall back to git for local builds
function getCommitSha() {
	if (process.env.AWS_COMMIT_ID) return process.env.AWS_COMMIT_ID;
	try {
		return execSync("git rev-parse HEAD").toString().trim();
	} catch {
		return "unknown";
	}
}

const configWithImages = withImages({
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
		disableStaticImages: true,
	},
	async redirects() {
    		return [
			// 	{
        	// 	source: '/archive',
        	// 	destination: '/programs',
        	// 	permanent: true,
      		// }, 
			{
				source: '/:any',
				destination: '/',
				permanent: false,
			}]
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
		COMMIT_SHA: getCommitSha(),
	}
  })

  module.exports = withSentryConfig(configWithImages);
