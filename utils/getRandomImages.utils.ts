import { images } from "../data/images";

export function getRandomFrom(dataset: any[], limit: number) {
	const shuffled = dataset.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, limit);
}

export const filteredImages = getRandomFrom(images, 7);