import React from 'react';
import { Colors } from '../components/ui/Colors';
import { Page } from '../components/ui/Page';
import { Heading } from '../components/ui/Typography';

const NewAboutPage: React.FC = () => {
	return (
		<Page>
			test
			<Heading>Heading</Heading>
			<Heading as="h1">Heading as h1</Heading>
			<Heading as="h6">Heading as h6</Heading>
			<Heading color={Colors.SAVTA_RED}>Heading with color</Heading>
		</Page>
	)
}

export default NewAboutPage;