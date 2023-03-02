import React, { useRef } from "react";
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
  return "default";
};

const ButtonIcon: React.FC<{isLoading?: boolean; isSuccess?: boolean}> = (props) => {
	if (props.isLoading) {
		return <FaSpinner />;
	}
	if (props.isSuccess) {
		return <FaCheckCircle />;
	}
	return null
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

  const { submitForm, isLoading, isError, isSuccess } = useContactForm({
    onSuccess: (data) => {
      formRef.current?.reset();
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    const response = submitForm(data);

    // TODO: Clear form

    captchaRef.current?.reset();
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
            <fieldset className={style.input}>
              <label htmlFor={FormFields.NAME}>שם מלא</label>
              <input
                type="text"
                id={FormFields.NAME}
                name={FormFields.NAME}
                placeholder="ישראל ישראלי"
              />
            </fieldset>
            <fieldset className={style.input}>
              <label htmlFor={FormFields.EMAIL}>אימייל</label>
              <input
                type="text"
                id={FormFields.EMAIL}
                name={FormFields.EMAIL}
                placeholder="israel@israel.co.il"
              />
            </fieldset>
            <fieldset className={style.input}>
              <label htmlFor={FormFields.MESSAGE}>הודעה</label>
              <textarea
                id={FormFields.MESSAGE}
                placeholder="איזה אלופים אתם! איך מצטרפים?"
              />
            </fieldset>
            <ReCAPTCHA
              ref={captchaRef}
              size="invisible"
              sitekey={process.env.RECAPTCA_KEY!}
            />
            <fieldset
              className={style.input}
              data-type="submit"
              data-skin={getButtonSkin({ isLoading, isSuccess })}
            >
              <span>
                <ButtonIcon isLoading={isLoading} isSuccess={isSuccess} />
              </span>
              <button disabled={isLoading}>שלח</button>
            </fieldset>
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
