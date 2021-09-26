import { Page } from "../../components/Page";

import styles from "./AboutPage.module.scss";
import cn from "classnames";

const AboutUsPage: React.FC = () => {
  return (
    <Page title="הסיפור של סבתא">
      <div className={styles.aboutUsPage}>
        <section className={styles.quoteSection}>
          <p className={styles.quote}>הלו? זה רדיו? זוהי השאלה, מהי הפינה?</p>
          <div className={styles.pageTitleWrapper}>
            <h1 className={styles.pageTitle}>סיפורי סבתא</h1>
          </div>
        </section>
        <section className={styles.storySection}>
          <div className="storyWrapper">
            <div className={cn(styles.firstSection, styles.section)}>
              <img
                src="http://lorempixel.com/700/300/people/SAVTA-YAEL/"
                alt="Our team image"
                className={styles.backgroundImage}
              />
              <p>
                קולקטיב 'רדיו סבתא' נוסד בשנת 2015 כתחנת רדיו אינטרנטי במצפה
                רמון. התחנה נוסדה ע"י עירא דיין, במטרה להנציח את (סבתא) יעל קרן,
                חותנתו של עירא
              </p>
            </div>
            <div className={cn(styles.secondSection, styles.section)}>
              <p>
                עירא ביקש לשמר בפעילות התחנה את האוירה החמה והמארחת שהיתה בסלון
                של סבתא, שהיתה מלווה תמיד במוזיקה משובחת בשלל סגנונות. הרדיו
                משדר מוזיקה איכותית ללא פשרות והרבה כבוד לסבים והסבתות, חיבור
                לשורשים ולרוח המדברית.
              </p>
			  <p>
              בתחילת הדרך התחנה עבדה מתוך אולפן במצפה רמון, ע"י תושבי מצפה רמון.
              עם השנים, חלק מההרכב המקורי של שדרני התחנה עזב את מצפה רמון אך לא
              את רדיו-סבתא, והחלו שידורים מבתי חלק מהשדרנים בנוסף לשידור החי
              מהאולפן.</p>
            </div>
			<div className={cn(styles.thirdSection, styles.section)}>
            <p> בשנת 2020 עם פרוץ משבר הקורונה התחנה עברה לשידור אינטרנטי
              ללא אולפן מרכזי אלא ממספר נקודות שידור ברחבי ישראל, מרמת הגולן, תל
              אביב, באר שבע, אשלים, מדרשת בן גוריון ומצפה רמון. נכון לאוקטובר
              2020 התחנה מתפקדת למעשה כקולקטיב שבו מתחלקים החברים בזמני השידור
              בערבים.
            </p>
			</div>
			<div className={cn(styles.fourthSection, styles.section)}>
            <p>
              המודל הכלכלי של רדיו סבתא נשען בעיקר על כספי תומכים חופשיים, דרך
              פלטפורמת פטריון. כדי שהתחנה תוכל לשדר באופן בר קיימא, הציפייה
              מהחברים בקולקטיב לעשות מנוי לתרומה חודשית בשיעור של 5$ שמאפשר
              תשלום על הוצאות התפעול השוטפות והמשך הצטיידות ומיתוג.{" "}
            </p>
			<div className={styles.storyImageWrapper}>
              <img
                src="http://lorempixel.com/1920/400/people/team-image-here/"
                alt="Our team image"
                className={styles.backgroundImage}
              />
            </div>
			</div>
          </div>
        </section>
        <section>Timeline section</section>
        <section>בעלי תפקידים</section>
      </div>
    </Page>
  );
};

export default AboutUsPage;
