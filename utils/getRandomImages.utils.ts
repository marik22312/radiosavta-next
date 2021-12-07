import { images } from "../data/images";
import { getRandomFrom } from "./getRandomFrom.utils";

export const getFilteredImages = () => {
	return getRandomFrom(images, 7);
}