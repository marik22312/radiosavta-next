import { useMutation } from "react-query";
import { submitContactForm } from "../api/Contact.api";

export const useContactForm = (opts?: {
  onSuccess?: (data: Awaited<ReturnType<typeof submitContactForm>>) => void;
  onError?: (error: Error) => void;
}) => {
  const { mutate, ...rest } = useMutation(submitContactForm, opts);
  return {
    submitForm: mutate,
    ...rest,
  };
};
