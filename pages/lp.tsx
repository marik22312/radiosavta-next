import { GetServerSidePropsContext } from 'next';
import React from 'react';

const LandingPage = () => {
	return (
		<>
		<div style={{minHeight: '500px', backgroundColor: "#C3C3C3"}}><div><h2>LandingPage</h2></div></div>
		</>
	)
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	console.log('#######', context.req.cookies);

	return {
		props: {}
	}
}

export default LandingPage