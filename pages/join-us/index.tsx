import React, { useRef, useState } from "react";
import { Colors } from "../../components/ui/Colors";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import style from "./joinUs.module.scss";
import { ContactFormRequest, submitContactForm } from "../../api/Contact.api";
import { useMutation, UseMutationOptions } from "react-query";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

enum FormFields {
  NAME = "fullname",
  EMAIL = "email",
  MESSAGE = "message",
}

const getButtonSkin = (args: { isLoading?: boolean; isSuccess?: boolean }) => {
  if (args.isLoading) {
    return "loading";
  }
  if (args.isSuccess) {
    return "success";
  }
};

const ButtonIcon: React.FC<{ isLoading?: boolean; isSuccess?: boolean }> = (
  props
) => {
  if (props.isLoading) {
    return <FaSpinner />;
  }
  if (props.isSuccess) {
    return <FaCheckCircle />;
  }
  return null;
};
const useContactForm = (opts?: {
  onSuccess?: (data: Awaited<ReturnType<typeof submitContactForm>>) => void;
  onError?: (error: Error) => void;
}) => {
  const { mutate, ...rest } = useMutation(submitContactForm, opts);
  return {
    submitForm: mutate,
    ...rest,
  };
};
const JoinUsPage: React.FC = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { submitForm, isError, isSuccess } = useContactForm({
    onSuccess: (data) => {
		setIsLoading(false);
      formRef.current?.reset();
	  captchaRef.current?.reset();
    },
	onError: (error) => {
		captchaRef.current?.reset();
		setIsLoading(false);
	}
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
	setIsLoading(true);

    const captcha = await captchaRef.current?.executeAsync();
    const data: ContactFormRequest = {
      // @ts-expect-error
      [FormFields.NAME]: e.target[FormFields.NAME].value,
      // @ts-expect-error
      [FormFields.EMAIL]: e.target[FormFields.EMAIL].value,
      // @ts-expect-error
      [FormFields.MESSAGE]: e.target[FormFields.MESSAGE].value,
      recaptcha: captcha ?? "",
    };
    submitForm(data);
  };
  return (
    <Page>
      <div style={{ paddingRight: "21px" }}>
        <Heading>הצטרפו לקולקטיב</Heading>
      </div>
      <div className={style.joinUsWrapper}>
        <div className={style.joinUsText}>
          <div>
            <p>רוצה לשדר ברדיו סבתא?</p>
            <p>קולטים אותך</p>
          </div>
          <div>
            רוצים לגלות או להשמיע את קולכםן? חלמתםן להיות השדרן והעורכת של רצועת
            רדיו שלכםן?ֿ ללמוד על הנעשה מאחורי הקלעים ואיך קורה קסם הרדיופוני?
            רדיוסבתא הוא פלטפורמה פתוחה להשמעת קול, עמדה ויידע - אנחנו כאן בשביל
            לעזור לכםן להוציא את עצמכםן לאור יחד ומול קהל בייתי של חובבי רדיו
            כמותכםן
          </div>
          <div>
            <p>ברוכים הבאות לסלון של סבתא!</p>
          </div>
        </div>
      </div>
      <section>
        <div style={{ paddingRight: "21px", marginTop: "35px" }}>
          <Heading color={Colors.SAVTA_ORANGE}>דברו איתנו</Heading>
        </div>
        <div className={style.formWrapper}>
          <form ref={formRef} onSubmit={onSubmit}>
            <FormField
              label="שם מלא"
              name={FormFields.NAME}
              placeholder="ישראל ישראלי"
            />
            <FormField
              label="אימייל"
              name={FormFields.EMAIL}
              placeholder="israel@israeli.co.il"
            />
            <FormField
              label="הודעה"
              type="textarea"
              name={FormFields.MESSAGE}
			  placeholder="איזה אלופים אתם! איך מצטרפים?"
            />
            <ReCAPTCHA
              ref={captchaRef}
              size="invisible"
              sitekey={process.env.RECAPTCA_KEY!}
            />
            <FormField
              type="submit"
              skin={getButtonSkin({ isLoading, isSuccess })}
            />
          </form>
          <div className={style.formStatusWrapper}>
            {isError && (
              <Alert
                text="אוי לא, קרתה שגיאה... בואו ננסה שוב מאוחר יותר"
                type={AlertType.ERROR}
              />
            )}
          </div>
        </div>
      </section>
    </Page>
  );
};

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
}

export interface AlertProps {
  type: "success" | "error";
  text: string;
}
export const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div className={style.notification} data-type={props.type}>
      <span>
        {props.type === AlertType.SUCCESS ? (
          <FaCheckCircle size={25} />
        ) : (
          <FaTimesCircle size={25} />
        )}
      </span>
      <p>{props.text}</p>
    </div>
  );
};

export default JoinUsPage;

export interface FormFieldProps {
  label?: string;
  name?: string;
  type?: "text" | "email" | "textarea" | "submit";
  placeholder?: string;
  skin?: "success" | "loading";
}
export const FormField: React.FC<FormFieldProps> = (props) => {
  if (props.type === "textarea") {
	return (
		<fieldset className={style.input}>
      <label htmlFor={`input-${props.name}`}>{props.label ?? ""}</label>
      <textarea
        id={props.name && `input-${props.name}`}
        name={props.name}
        placeholder={props.placeholder}
      />
    </fieldset>
	)
  }
  if (props.type === "submit") {
    const isLoading = props.skin === "loading";
    const isSuccess = props.skin === "success";
    return (
      <fieldset
        className={style.input}
        data-type="submit"
        data-skin={getButtonSkin({ isLoading, isSuccess })}
      >
        <span>
          <ButtonIcon isLoading={isLoading} isSuccess={isSuccess} />
        </span>
        <button type="submit" disabled={isLoading}>
          שלח
        </button>
      </fieldset>
    );
  }

  return (
    <fieldset className={style.input}>
      <label htmlFor={`input-${props.name}`}>{props.label ?? ""}</label>
      <input
        type={props.type}
        id={props.name && `input-${props.name}`}
        name={props.name}
        placeholder={props.placeholder}
      />
    </fieldset>
  );
};
