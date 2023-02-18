import React from "react";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import style from "./joinUs.module.scss";

const JoinUsPage: React.FC = () => {
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
		  <div>
			<p>דברו איתנו ב</p>
		  </div>
        </div>
      </div>
    </Page>
  );
};

export default JoinUsPage;
