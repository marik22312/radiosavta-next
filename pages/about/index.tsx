import React from 'react';
import { asStandardPage } from '../../components/Page/asStandardPage';
import { Page } from '../../components/ui/Page';
import { Heading } from '../../components/ui/Typography';
import style from './aboutPage.module.scss';
import { Seo } from '../../components/seo/seo';

const NewAboutPage: React.FC = () => {
	return (
		<>
		<Seo title="רדיוסבתא - למה סבתא?"/>
			<div style={{paddingRight: '21px'}}>
			<Heading>למה סבתא?</Heading>
			</div>
			<div className={style.aboutUsWrapper}>
				<div className={style.aboutUsText}>
					<p>קולקטיב‭ &apos;‬רדיו‭ ‬סבתא‭&apos; ‬נוסד‭ ‬בשנת‭ ‬2015‭ ‬כתחנת‭ ‬רדיו‭ ‬אינטרנטי‭ ‬במצפה‭ ‬רמון‭ ‬ע‭&quot;‬י‭ ‬עירא‭ ‬דיין‭, ‬ושם‭ ‬לו‭ ‬למטרה‭ ‬להנציח‭ ‬את‭ ‬המורשת‭ ‬המוסיקלית‭ ‬של‭ ‬יעל‭ ‬קרן‭ ‬ז&quot;ל‭, ‬הסבתא‭ ‬והחמות‭ ‬של‭ ‬עירא‭. ‬הרעיון‭ ‬היה‭ ‬להביא‭ ‬לשידור‭ ‬את‭ ‬האוירה‭ ‬החמה‭ ‬והפתוחה‭ ‬לכל‭ ‬שהיתה‭ ‬בסלון‭ ‬של‭ ‬סבתא‭. ‬איסוף‭ ‬והאזנה‭ ‬למוסיקה‭ ‬משובחת‭ ‬24‭ ‬שעות‭ ‬ביממה‭, ‬ואורחים‭ ‬רבים‭ ‬שהתקבלו‭ ‬בחום‭ ‬ואהבה</p>
					<p>זה‭ ‬התחיל‭ ‬משידור‭ ‬בלתי‭ ‬פוסק‭ ‬של‭ ‬מוסיקה‭ ‬והתפתח‭ ‬לתכניות‭ ‬קבועות‭ ‬בסגנונות‭ ‬שונים‭ ‬ומגוונים‭. ‬כ‭-‬5‭ ‬שנים‭ ‬שודרו‭ ‬תכניות‭ ‬מהאולפן‭ ‬במצפה‭, ‬והתחנה‭ ‬תופעלה‭ ‬על‭ ‬ידי‭ ‬תושבי‭ ‬המקום‭ ‬וחברים‭ ‬של‭ ‬המשפחה‭. ‬</p>
					<p>עם‭ ‬השנים‭, ‬הרכב‭ ‬השדרנים‭ ‬השתנה‭. ‬חלק‭ ‬מהשדרנים‭ ‬עזבו‭ ‬את‭ ‬מצפה‭ ‬רמון‭ ‬ושדרנים‭ ‬חדשים‭ ‬הצטרפו‭. ‬עם‭ ‬פרוץ‭ ‬משבר‭ ‬הקורונה‭ ‬ב‭-‬2020‭ ‬השידורים‭ ‬עברו‭ ‬מהאולפן‭ ‬במצפה‭ ‬רמון‭ ‬לאולפנים‭ ‬ביתיים‭ ‬ברחבי‭ ‬הארץ‭ ‬והעולם‭: ‬מרמת‭ ‬הגולן‭, ‬תל‭ ‬אביב‭, ‬ברלין‭, ‬באר‭ ‬שבע‭, ‬רמת‭-‬גן‭, ‬עמק‭ ‬הירדן‭, ‬דרמסאלה‭, ‬אשלים‭, ‬מדרשת‭ ‬בן‭ ‬גוריון‭, ‬מצפה‭ ‬רמון‭ ‬ולאורך‭ ‬שביל‭ ‬ישראל‭. </p>
					<p>התחנה‭ ‬מתפקדת‭ ‬למעשה‭ ‬כקולקטיב‭ ‬שבו‭ ‬מתחלקים‭ ‬החברים‭ ‬בזמני‭ ‬השידור‭ ‬בערבים‭ ‬לפי‭ ‬לו&quot;ז‭ ‬קבוע‭ ‬ופתוח‭ ‬לאלתורים‭. ‬בזמן‭ ‬שאין‭ ‬תכניות‭ ‬חיות‭ ‬מתנגנים‭ ‬פלייליסטים‭ ‬איכותיים‭ ‬הנערכים‭ ‬ומתעדכנים‭ ‬ע&quot;י‭ ‬השדרנים‭.‬</p>
					<p>המודל‭ ‬הכלכלי‭ ‬של‭ ‬רדיו‭ ‬סבתא‭ ‬נשען‭ ‬בעיקר‭ ‬על‭ ‬תומכים‭ ‬חופשיים‭ ‬מכל‭ ‬העולם‭, ‬אוהבי‭ ‬ומעריכי‭ ‬מוסיקה‭ ‬ללא‭ ‬הפרעות‭ ‬מסחריות‭. ‬בכדי‭ ‬שהתחנה‭ ‬תוכל‭ ‬להמשיך‭ ‬לשדר‭, ‬להתפתח‭ ‬ולהשתפר‭, ‬נודה‭ ‬לכם‭/‬ן‭ ‬ביותר‭ ‬על‭ ‬תרומה‭ ‬חודשית‭ ‬סמלית‭ ‬דרך‭ ‬פלטפורמת‭ ‬Patreon‭ ‬בהרשמה‭ ‬חד‭ ‬פעמית‭ ‬לתרומה‭ ‬חודשית‭ ‬קבועה‭ ‬וצנועה‭,‬‭ ‬שנותנת‭ ‬לנו‭ ‬אפשרות‭ ‬להמשיך‭ ‬לשדר‭ ‬ולהמשיך‭ ‬את‭ ‬הזרם‭ ‬הבלתי‭ ‬פוסק‭ ‬של‭ ‬מוזיקה‭ ‬ואהבה‭,‬‭ ‬כמו‭ ‬בסלון‭ ‬של‭ ‬סבתא‭. ‬</p>
				</div>
			</div>
		</>
	)
}

export default asStandardPage(NewAboutPage);