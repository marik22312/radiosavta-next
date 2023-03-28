import { httpClient } from './httpClient'

export interface ContactFormRequest {
	fullname?: string;
	email?: string;
	message?: string;
	recaptcha?: string;
}
export const submitContactForm = (req: ContactFormRequest) => {
	return new Promise((res, rej) => {
		setTimeout(() => {res({})}, 5000)
	})
	return httpClient.post<{ successMessage: string }>('/v2/contact', req);
}