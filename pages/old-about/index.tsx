import React from "react";
import { Page } from "../../components/Page";
import { BASE_IMAGE } from "../../config/images";
import Image from "next/image";
import Link from "next/link";

import style from "./AboutPageNew.module.scss";
import BecomeAPateronButton from "./assets/become_a_patron_button@2x.png";
import TeamMembersData from "./data/team.json";
import { TeamMember } from "../../components/TeamMember/TeamMember";
import classNames from "classnames";

const CONTACT_NUMBER = process.env.CONTACT_NUMBER;

const AboutUsPage = () => {
  return (
    <Page title="הסיפור של סבתא">
      <div className={style.pageWrapper}>
        <div className={style.aboutUsSection}>
          <div className={style.titleAndAbout}>
            <div className={style.title}>
              <h1>
                רדיוסבתא
                <br />
                קולקטיב רדיו אינטרנטי
              </h1>
            </div>
            <div className={style.aboutUsText}>
              <p>
                קולקטיב &apos;רדיו סבתא&apos; נוסד בשנת 2015 כתחנת רדיו אינטרנטי
                במצפה רמון. התחנה נוסדה ע&quot;י עירא דיין, במטרה להנציח את
                (סבתא) יעל קרן, חמתו.
              </p>
              <p>
                עירא ביקש לשמר בפעילות התחנה את האוירה החמה והמארחת שהיתה בסלון
                של סבתא, שהיתה מלווה תמיד במוזיקה משובחת בשלל סגנונות. הרדיו
                משדר מוזיקה איכותית ללא פשרות והרבה כבוד לסבים והסבתות, חיבור
                לשורשים ולרוח המדברית.
              </p>
              <p>
                בתחילת הדרך התחנה עבדה מתוך אולפן במצפה רמון, ע&quot;י תושבי
                מצפה רמון. עם השנים, חלק מההרכב המקורי של שדרני התחנה עזב את
                מצפה רמון אך לא את רדיו-סבתא, והחלו שידורים מבתי חלק מהשדרנים
                בנוסף לשידור החי מהאולפן.
              </p>
              <p>
                בשנת 2020 עם פרוץ משבר הקורונה התחנה עברה לשידור אינטרנטי ללא
                אולפן מרכזי אלא ממספר נקודות שידור ברחבי ישראל, מרמת הגולן, תל
                אביב, באר שבע, רמתן גן, אפיקים, אשלים, מדרשת בן גוריון ומצפה רמון. נכון לאוקטובר
                2020 התחנה מתפקדת למעשה כקולקטיב שבו מתחלקים החברים בזמני השידור
                בערבים.
              </p>
              <p>
                המודל הכלכלי של רדיו סבתא נשען בעיקר על כספי תומכים חופשיים, דרך
                פלטפורמת פטריון. כדי שהתחנה תוכל לשדר באופן בר קיימא, הציפייה
                מהחברים בקולקטיב לעשות מנוי לתרומה חודשית בשיעור של 5$ שמאפשר
                תשלום על הוצאות התפעול השוטפות והמשך הצטיידות ומיתוג.{" "}
              </p>
            </div>
          </div>
          <div className={style.stickyWrapper}>
            <div className={style.pateronCta}>
              <h3>עזרו לנו להפיץ מוזיקה טובה</h3>
              <Link href="https://www.patreon.com/radiosavta/" passHref={true}>
                <a target="_blank" rel="noopener">
                  <Image
                    src={BecomeAPateronButton}
                    alt="Become a Pateron"
                    height={40}
                    width={160}
                  />
                </a>
              </Link>
            </div>
            <JoinCta className="show-md" />
          </div>
          <div className={style.radioImage}>
            <Image
              src={`${BASE_IMAGE}/radiosavta/gallery/berech.jpg`}
              layout={"fill"}
              alt="Radisoavta vibe image"
            />
          </div>
          <JoinCta className={"hide-md"} />
        </div>
        <div className={style.teamSection}>
          <div className={style.teamSectionTitle}>
            <h2>בעלי תפקידים</h2>
          </div>
          <div className={style.teamMembersWrapper}>
            {TeamMembersData.map((member) => {
              return <TeamMember {...member} key={`member-${member.name}`} />;
            })}
          </div>
        </div>
      </div>
    </Page>
  );
};

interface JoinCtaProps {
  className: string;
}
const JoinCta: React.FC<JoinCtaProps> = (props) => {
  return (
    <div className={classNames(style.joinCta, props.className)}>
      <h3>אוהבים רדיו?</h3>
      <Link
        href={`https://wa.me/${CONTACT_NUMBER}?text=%D7%94%D7%99%D7%99!%0A%D7%A4%D7%95%D7%A0%D7%94%20%D7%90%D7%9C%D7%99%D7%99%D7%9A%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%9C%D7%92%D7%91%D7%99%20%D7%A9%D7%99%D7%93%D7%95%D7%A8%20%D7%91%D7%A8%D7%93%D7%99%D7%95%D7%A1%D7%91%D7%AA%D7%90`}
        passHref
      >
        <a target="_blank" className={style.joinButton}>
          הצטרפו אלינו
        </a>
      </Link>
    </div>
  );
};

export default AboutUsPage;
