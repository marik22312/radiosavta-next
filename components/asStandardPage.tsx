import React from 'react';
import PlayerWrapper from './FooterPlayer/PlayerWrapper/PlayerWrapper';
import { Navbar } from './ui/Page';

export const asStandardPage = (Page: React.ElementType) => {
	// @ts-expect-error
	Page.getLayout = (page) => {
		return (
			<>
			<Navbar/>
				{page}
			{/* <PlayerWrapper /> */}
			</>
		)
	}

	return Page;
}