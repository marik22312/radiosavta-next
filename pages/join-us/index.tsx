import React, { useRef, useState } from "react";
import { Colors } from "../../components/ui/Colors";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import style from "./joinUs.module.scss";
import { ContactFormRequest } from "../../api/Contact.api";
import { FormField } from "../../components/ui/FormField";
import { useContactForm } from "../../hook/useContactForm";
import { Alert, AlertType } from "../../components/ui/Alert";
import { asStandardPage } from "../../components/Page/asStandardPage";
import { Seo } from "../../components/seo/seo";
import { logClickOnSubmitContactForm } from '../../api/Mixpanel.api';

enum FormFields {
  NAME = "fullname",
  EMAIL = "email",
  MESSAGE = "message",
}

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
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const captcha = await captchaRef.current?.executeAsync();
    // @ts-expect-error
    const name = e.target[FormFields.NAME].value ?? "";
    // @ts-expect-error
    const email = e.target[FormFields.EMAIL].value ?? "";
    // @ts-expect-error
    const message = e.target[FormFields.MESSAGE].value ?? "";

	logClickOnSubmitContactForm({
		hasEmail: !!email,
		hasName: !!name,
		hasMessage: !!message,
	})
    const data: ContactFormRequest = {
      [FormFields.NAME]: name,
      [FormFields.EMAIL]: email,
      [FormFields.MESSAGE]: message,
      recaptcha: captcha ?? "",
    };
    submitForm(data);
  };
  return (
    <>
      <Seo title=" רדיוסבתא - הצטרפו לקולקטיב" />
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
              inputType="email"
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
            {process.env.RECAPTCA_KEY && (
              <ReCAPTCHA
                ref={captchaRef}
                size="invisible"
                sitekey={process.env.RECAPTCA_KEY!}
              />
            )}
            <FormField
              disabled={isLoading || isSuccess}
              type="submit"
              label={getSubmitMessage({ isLoading, isSuccess })}
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
    </>
  );
};

const getButtonSkin = (args: { isLoading?: boolean; isSuccess?: boolean }) => {
  if (args.isLoading) {
    return "loading";
  }
  if (args.isSuccess) {
    return "success";
  }
};

const getSubmitMessage = (args: {
  isLoading?: boolean;
  isSuccess?: boolean;
}) => {
  if (args.isLoading) {
    return "שולח...";
  }
  if (args.isSuccess) {
    return "ההודעה נשלחה!";
  }
};

export default asStandardPage(JoinUsPage);
