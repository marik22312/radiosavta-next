import { BASE_IMAGE_ICON } from '../config/images';
import { Program } from '../domain/Program';

class ProgramParser {
	public programImage(program: Program): string {
			return `${BASE_IMAGE_ICON}/${program.cover_image || program.users?.[0]?.profile_image}` || '';
		}

	public name(program: Program): string {
		return program.name_he || program.name_en
	}
}

export const programParser = new ProgramParser();