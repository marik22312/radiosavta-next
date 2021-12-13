import _ from "lodash";
import { images } from "../data/images";

export const getFilteredImages = () => {
	return _.shuffle(images).slice(0, 7);
}