import { httpClient } from './httpClient'

export interface ContactFormRequest {
	fullname: string;
	email: string;
	message: string;
	recaptcha: string;
}
export const submitContactForm = async (req: ContactFormRequest) => {
	return httpClient.post<{ successMessage: string }>('/v2/contact', req);
}