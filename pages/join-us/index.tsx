import React, { useRef } from "react";
import { Colors } from "../../components/ui/Colors";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import style from "./joinUs.module.scss";
import { ContactFormRequest, submitContactForm } from '../../api/Contact.api';

enum FormFields {
  NAME = "fullname",
  EMAIL = "email",
  MESSAGE = "message",
}

const JoinUsPage: React.FC = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
	const captcha = await captchaRef.current?.executeAsync();
	if (!captcha) {
		// show error
		console.log('no captcha');
		return;
	}
    const data: ContactFormRequest = {
      // @ts-expect-error
      [FormFields.NAME]: e.target[FormFields.NAME].value,
      // @ts-expect-error
      [FormFields.EMAIL]: e.target[FormFields.EMAIL].value,
      // @ts-expect-error
      [FormFields.MESSAGE]: e.target[FormFields.MESSAGE].value,
	  recaptcha: captcha
    };
	const response = await submitContactForm(data);

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
        <div>
          <form onSubmit={onSubmit}>
            <label htmlFor={FormFields.NAME}></label>
            <input
              type="text"
              id={FormFields.NAME}
              name={FormFields.NAME}
              placeholder="שם מלא"
            />
            <label htmlFor={FormFields.EMAIL}></label>
            <input
              type="text"
              id={FormFields.EMAIL}
              name={FormFields.EMAIL}
              placeholder="אימייל"
            />
            <textarea id={FormFields.MESSAGE}>Message</textarea>
            <ReCAPTCHA
              ref={captchaRef}
              size="invisible"
              sitekey={process.env.RECAPTCHA_SITE_KEY!}
            />
            <button>שלח</button>
          </form>
        </div>
      </section>
    </Page>
  );
};

export default JoinUsPage;
