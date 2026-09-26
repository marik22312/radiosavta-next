const { withSentryConfig } = require("@sentry/nextjs");
const { execSync } = require("child_process");

const SHA_PATTERN = /^[0-9a-f]{7,40}$/i;

// Amplify exposes the deployed commit as AWS_COMMIT_ID, but on some builds
// (manual deploys, some webhook triggers) it's the literal "HEAD". Only trust
// it when it looks like a real SHA; otherwise resolve it from the clone.
function getCommitSha() {
	const awsCommitId = process.env.AWS_COMMIT_ID;
	if (awsCommitId && SHA_PATTERN.test(awsCommitId)) return awsCommitId;
	try {
		return execSync("git rev-parse HEAD").toString().trim();
	} catch {
		return "unknown";
	}
}

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	async redirects() {
    		return [
			// 	{
        	// 	source: '/archive',
        	// 	destination: '/programs',
        	// 	permanent: true,
      		// }, 
			{
				// Everything except the in-progress redesign page
				source: '/:any((?!v2$)[^/]+)',
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
  }

  module.exports = withSentryConfig(nextConfig);
