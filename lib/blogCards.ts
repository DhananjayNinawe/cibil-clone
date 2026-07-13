/**
 * Blog card titles for the Knowledge Center listing pages, transcribed from the source site.
 * These are article-title CONTENT (not UI chrome), but they are nonetheless fully localised: every
 * headline carries a per-locale `title: Record<Language, string>` so the listing pages read in the
 * reader's language, exactly like the surrounding page chrome (hero, "Topics", "BLOG", banners).
 * Brand names and tokens (CIBIL, TransUnion, RBI, NBFC, PAN, GST, EMI, MSME) and numerals stay in
 * Latin script in every locale.
 *
 * A card is a per-locale title plus, optionally, its teaser image. Cards without an image fall back
 * to a gradient tile in BlogGrid.
 */
import type { Language } from "@/lib/i18n";

export interface BlogCard {
  /** Headline, per locale. */
  title: Record<Language, string>;
  /** Teaser artwork; cards without one fall back to a gradient tile in BlogGrid. */
  image?: string;
}

const TEASER = "https://www.cibil.com/blog";

export const CREDIT_ADVICE_CARDS: BlogCard[] = [
  {
    title: {
      en: "Building a Strong Financial Foundation Essential Money Skills for Young Indians",
      hi: "मज़बूत वित्तीय नींव: युवा भारतीयों के लिए ज़रूरी पैसों के हुनर",
      mr: "भक्कम आर्थिक पाया: तरुण भारतीयांसाठी आवश्यक पैशाची कौशल्ये",
      ta: "வலுவான நிதி அடித்தளம்: இளம் இந்தியர்களுக்கான அத்தியாவசியப் பண நிர்வாகத் திறன்கள்",
    },
    image: `${TEASER}/building-a-strong-financial-foundation-essential-money-skills-for-young-indians/_jcr_content/teaserImage.coreimg.75.1440.png/1699254127999/money-skills.png`,
  },
  {
    title: {
      en: "Set Yourself Up in Your 20s for Financial Stability in Your 40s",
      hi: "20 की उम्र में उठाए कदम, 40 में दिलाएँगे आर्थिक स्थिरता",
      mr: "विशीत उचललेली पावले, चाळिशीत आर्थिक स्थैर्य देतील",
      ta: "20 வயதில் எடுக்கும் அடிகளே 40 வயதில் நிதி நிலைத்தன்மையைத் தரும்",
    },
    image: `${TEASER}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/_jcr_content/teaserImage.coreimg.75.1440.png/1690797885030/stability-in-your-fourties-.png`,
  },
  {
    title: {
      en: "Your One-stop Holiday Shopping Credit Guide",
      hi: "छुट्टियों की खरीदारी के लिए आपकी संपूर्ण क्रेडिट गाइड",
      mr: "सुट्टीतील खरेदीसाठी तुमचे संपूर्ण क्रेडिट मार्गदर्शक",
      ta: "விடுமுறை ஷாப்பிங்கிற்கான உங்கள் முழுமையான கிரெடிட் வழிகாட்டி",
    },
    image: `${TEASER}/your-one-stop-holiday-shopping-credit-guide/_jcr_content/teaserImage.coreimg.75.1440.png/1685047513600/holiday-season.png`,
  },
  {
    title: {
      en: "CIBIL Alerts: A Smarter, Safer Way to Protect Your Financial Identity",
      hi: "CIBIL Alerts: अपनी वित्तीय पहचान बचाने का समझदार और सुरक्षित तरीका",
      mr: "CIBIL Alerts: तुमची आर्थिक ओळख जपण्याचा हुशार आणि सुरक्षित मार्ग",
      ta: "CIBIL Alerts: உங்கள் நிதி அடையாளத்தைக் காக்க ஒரு புத்திசாலியான, பாதுகாப்பான வழி",
    },
    image: `${TEASER}/cibil-alerts-a-smarter-safer-way-to-protect-your-financial-identity/_jcr_content/teaserImage.coreimg.75.1440.png/1693462150678/cibil-alerts.png`,
  },
  {
    title: {
      en: "Here's How Creditworthiness Accelerates Your Financial Independence",
      hi: "क्रेडिट साख कैसे तेज़ करती है आपकी आर्थिक आज़ादी की राह",
      mr: "पतपात्रता तुमच्या आर्थिक स्वातंत्र्याचा वेग कसा वाढवते",
      ta: "கடன் தகுதி உங்கள் நிதிச் சுதந்திரத்தை எப்படி விரைவுபடுத்துகிறது",
    },
    image: `${TEASER}/heres-how-creditworthiness-accelerates-your-financial-independence/_jcr_content/teaserImage.coreimg.75.1440.png/1685048219550/creditworthiness-accelerates.png`,
  },
  {
    title: {
      en: "How a Strong CIBIL Score Can Help Home Loan Borrowers",
      hi: "मज़बूत CIBIL स्कोर होम लोन लेने वालों के कैसे काम आता है",
      mr: "भक्कम CIBIL स्कोअर गृहकर्ज घेणाऱ्यांना कसा उपयोगी पडतो",
      ta: "வலுவான CIBIL ஸ்கோர் வீட்டுக் கடன் பெறுபவர்களுக்கு எப்படி உதவுகிறது",
    },
    image: `${TEASER}/how-a-strong-cibil-score-can-help-home-loan-borrowers/_jcr_content/teaserImage.coreimg.75.1440.png/1685048825966/homeloan.png`,
  },
  {
    title: {
      en: "Some of the Common Credit Mistakes to Avoid",
      hi: "क्रेडिट से जुड़ी वे आम गलतियाँ, जिनसे बचना ज़रूरी है",
      mr: "क्रेडिटबाबतच्या ज्या सामान्य चुका टाळायलाच हव्यात",
      ta: "தவிர்க்க வேண்டிய பொதுவான கடன் தவறுகள் சில",
    },
    image: `${TEASER}/some-of-the-common-credit-mistakes-to-avoid/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834667/top-credit-mistakes.png`,
  },
  {
    title: {
      en: "Safeguarding your Credit Profile",
      hi: "अपनी क्रेडिट प्रोफ़ाइल को सुरक्षित कैसे रखें",
      mr: "तुमची क्रेडिट प्रोफाइल सुरक्षित कशी ठेवाल",
      ta: "உங்கள் கிரெடிட் சுயவிவரத்தைப் பாதுகாப்பது எப்படி",
    },
    image: `${TEASER}/safeguarding-your-credit-profile/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208834621/safeguard.jpeg`,
  },
  {
    title: {
      en: "How Women's Credit Choices are affecting the Indian Economic Ecosystem",
      hi: "महिलाओं के क्रेडिट फैसले कैसे बदल रहे हैं भारत की अर्थव्यवस्था",
      mr: "महिलांचे क्रेडिट निर्णय भारताच्या अर्थव्यवस्थेला कसे आकार देत आहेत",
      ta: "பெண்களின் கடன் தேர்வுகள் இந்தியப் பொருளாதாரச் சூழலை எப்படி மாற்றுகின்றன",
    },
    image: `${TEASER}/how-womens-credit-choices-are-affecting-he-indian-economic-ecosystem/_jcr_content/teaserImage.coreimg.75.1440.png/1671208810929/iwd-banner.png`,
  },
  {
    title: {
      en: "Move Towards Financial Freedom With These Three Steps",
      hi: "इन तीन कदमों से बढ़ें आर्थिक आज़ादी की ओर",
      mr: "या तीन पावलांनी आर्थिक स्वातंत्र्याकडे वाटचाल करा",
      ta: "இந்த மூன்று படிகளுடன் நிதிச் சுதந்திரத்தை நோக்கி நகருங்கள்",
    },
    image: `${TEASER}/move-towards-financial-freedom-with-three-steps/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208484923/financial-freedom.jpeg`,
  },
  {
    title: {
      en: "Build A Positive Credit Profile With Good Credit Habits",
      hi: "अच्छी क्रेडिट आदतों से बनाएँ मज़बूत क्रेडिट प्रोफ़ाइल",
      mr: "चांगल्या क्रेडिट सवयींतून घडवा सकारात्मक क्रेडिट प्रोफाइल",
      ta: "நல்ல கடன் பழக்கங்களால் சிறந்த கிரெடிட் சுயவிவரத்தை உருவாக்குங்கள்",
    },
    image: `${TEASER}/build-a-positive-credit-profile-with-good-credit-habits/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802681/build-positive-profile.jpeg`,
  },
  {
    title: {
      en: "The Advantages Of A Positive Credit Profile And High CIBIL Score",
      hi: "अच्छी क्रेडिट प्रोफ़ाइल और ऊँचे CIBIL स्कोर के फायदे",
      mr: "सकारात्मक क्रेडिट प्रोफाइल आणि उच्च CIBIL स्कोअरचे फायदे",
      ta: "சிறந்த கிரெடிட் சுயவிவரம் மற்றும் உயர் CIBIL ஸ்கோரின் நன்மைகள்",
    },
    image: `${TEASER}/the-advantages-of-a-positive-credit-profile-and-high-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.png/1671208803457/advantagesofhighcibil.png`,
  },
  {
    title: {
      en: "All You Need To Know About Your CIBIL Score And How It Is Calculated",
      hi: "आपका CIBIL स्कोर कैसे बनता है — जानिए सब कुछ",
      mr: "तुमचा CIBIL स्कोअर कसा मोजला जातो — जाणून घ्या सर्व काही",
      ta: "உங்கள் CIBIL ஸ்கோர் எப்படிக் கணக்கிடப்படுகிறது — தெரிந்துகொள்ள வேண்டியவை",
    },
    image: `${TEASER}/all-you-need-to-know-about-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802791/calculate.jpeg`,
  },
  {
    title: {
      en: "Tackle a Financial Hardship with Calm and Credit consciousness",
      hi: "आर्थिक संकट का सामना करें संयम और क्रेडिट समझदारी के साथ",
      mr: "आर्थिक अडचणीला सामोरे जा — संयमाने आणि क्रेडिट भानाने",
      ta: "நிதி நெருக்கடியை நிதானத்துடனும் கடன் விழிப்புணர்வுடனும் எதிர்கொள்ளுங்கள்",
    },
    image: `${TEASER}/tackle-financial-hardship-with-calm-and-credit-consciousness/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802923/financial-hardships.jpeg`,
  },
  {
    title: {
      en: "Know The Difference Between Your CIBIL Score and Report",
      hi: "CIBIL स्कोर और CIBIL रिपोर्ट में क्या फर्क है, जानिए",
      mr: "CIBIL स्कोअर आणि CIBIL अहवाल यांतील फरक जाणून घ्या",
      ta: "CIBIL ஸ்கோருக்கும் CIBIL அறிக்கைக்கும் உள்ள வேறுபாட்டை அறியுங்கள்",
    },
    image: `${TEASER}/cibil-score-vs-report/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208810987/score-vs-report.jpeg`,
  },
  {
    title: {
      en: "How To Create Your Financial And Credit Roadmap",
      hi: "कैसे बनाएँ अपनी वित्तीय और क्रेडिट योजना",
      mr: "तुमचा आर्थिक आणि क्रेडिट आराखडा कसा तयार कराल",
      ta: "உங்கள் நிதி மற்றும் கடன் திட்டவரைபடத்தை உருவாக்குவது எப்படி",
    },
    image: `${TEASER}/how-to-create-your-financial-and-credit-roadmap/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803156/credit-roadmap.jpeg`,
  },
  {
    title: {
      en: "Credit habits of Indian Millennials",
      hi: "भारतीय मिलेनियल्स की क्रेडिट आदतें",
      mr: "भारतीय मिलेनियल्सच्या क्रेडिट सवयी",
      ta: "இந்திய மில்லேனியல்களின் கடன் பழக்கங்கள்",
    },
    image: `${TEASER}/credit-habits-of-indian-millennial/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208908849/millenialstudybanner.jpeg`,
  },
  {
    title: {
      en: "Here's How Your Gold Ornaments Can Help You Get Access To Credit",
      hi: "आपके सोने के गहने कैसे दिला सकते हैं आसान कर्ज़",
      mr: "तुमचे सोन्याचे दागिने कर्ज मिळवून देण्यात कसे उपयोगी पडतात",
      ta: "உங்கள் தங்க நகைகள் கடன் பெற எப்படி உதவும்",
    },
    image: `${TEASER}/how-your-gold-ornaments-can-help-you-get-access-to-credit/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802823/goldloanblog.jpeg`,
  },
  {
    title: {
      en: "How does your CIBIL Score affect your car loan?",
      hi: "आपका CIBIL स्कोर कार लोन पर कैसे असर डालता है?",
      mr: "तुमचा CIBIL स्कोअर कार कर्जावर कसा परिणाम करतो?",
      ta: "உங்கள் CIBIL ஸ்கோர் கார் கடனை எப்படிப் பாதிக்கிறது?",
    },
    image: `${TEASER}/how-does-your-cibil-score-affect-your-car-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802965/carloan.jpeg`,
  },
  {
    title: {
      en: "Taking Informed Credit Decisions Just Got Easier With The Score Simulator",
      hi: "स्कोर सिम्युलेटर से क्रेडिट के समझदार फैसले लेना हुआ आसान",
      mr: "स्कोअर सिम्युलेटरमुळे क्रेडिटचे सुजाण निर्णय घेणे झाले सोपे",
      ta: "ஸ்கோர் சிமுலேட்டரால் தெளிவான கடன் முடிவுகள் இப்போது எளிது",
    },
    image: `${TEASER}/taking-informed-credit-decisions-just-got-easier-with-the-score-simulator/_jcr_content/teaserImage.coreimg.75.1440.png/1671208810652/simulatorblogbanner.png`,
  },
  {
    title: {
      en: "Cycle Of Good Credit",
      hi: "अच्छे क्रेडिट का चक्र",
      mr: "चांगल्या क्रेडिटचे चक्र",
      ta: "நல்ல கடனின் சுழற்சி",
    },
    image: `${TEASER}/cycle-of-good-credit/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208484875/cycle-of-credit.jpeg`,
  },
  {
    title: {
      en: "Is There A Difference Between CIBIL Rank and CIBIL Score?",
      hi: "CIBIL Rank और CIBIL स्कोर में कोई अंतर है क्या?",
      mr: "CIBIL Rank आणि CIBIL स्कोअर यांत काही फरक आहे का?",
      ta: "CIBIL Rank-கும் CIBIL ஸ்கோருக்கும் வித்தியாசம் உண்டா?",
    },
    image: `${TEASER}/is-there-a-difference-between-cibilrank-and-cibilscore/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208514057/rank-vs-score-banner.jpeg`,
  },
  {
    title: {
      en: "7 Steps Towards Maintaining A Healthy CIBIL Score",
      hi: "स्वस्थ CIBIL स्कोर बनाए रखने के 7 कदम",
      mr: "निरोगी CIBIL स्कोअर टिकवण्यासाठी 7 पावले",
      ta: "ஆரோக்கியமான CIBIL ஸ்கோரைப் பேண 7 படிகள்",
    },
    image: `${TEASER}/7-steps-towards-maintaining-healthy-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803210/7steps.jpeg`,
  },
  {
    title: {
      en: "8 Steps to Protect Yourself from Credit Fraud and Identity Theft",
      hi: "क्रेडिट फ्रॉड और पहचान की चोरी से बचने के 8 उपाय",
      mr: "क्रेडिट फसवणूक आणि ओळखचोरीपासून वाचण्यासाठी 8 उपाय",
      ta: "கடன் மோசடி மற்றும் அடையாளத் திருட்டிலிருந்து தற்காத்துக்கொள்ள 8 படிகள்",
    },
    image: `${TEASER}/four-steps-to-protect-yourself-from-credit-fraud/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208495100/id-fraud-blog.jpeg`,
  },
  {
    title: {
      en: "5 Things Every Parent Should Know While Applying for An Education Loan",
      hi: "एजुकेशन लोन लेने से पहले हर माता-पिता जान लें ये 5 बातें",
      mr: "शैक्षणिक कर्ज घेण्यापूर्वी प्रत्येक पालकाने जाणून घ्याव्यात अशा 5 गोष्टी",
      ta: "கல்விக் கடன் பெறும் முன் ஒவ்வொரு பெற்றோரும் அறிய வேண்டிய 5 விஷயங்கள்",
    },
    image: `${TEASER}/five-things-every-parent-should-know-while-applying-for-education-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802725/education-loan-advice.jpeg`,
  },
  {
    title: {
      en: "Four Things To Consider When Applying For A Travel Loan",
      hi: "ट्रैवल लोन लेते समय ध्यान रखें ये चार बातें",
      mr: "प्रवास कर्जासाठी अर्ज करताना लक्षात ठेवाव्यात अशा चार गोष्टी",
      ta: "பயணக் கடனுக்கு விண்ணப்பிக்கும்போது கவனிக்க வேண்டிய நான்கு விஷயங்கள்",
    },
    image: `${TEASER}/four-things-to-consider-when-applying-for-a-travel-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208514100/travel-article.jpeg`,
  },
  {
    title: {
      en: "Six Ways You Can Use Your Credit Card For An Optimum Credit Score",
      hi: "बेहतरीन क्रेडिट स्कोर के लिए क्रेडिट कार्ड इस्तेमाल करने के छह तरीके",
      mr: "उत्तम क्रेडिट स्कोअरसाठी क्रेडिट कार्ड वापरण्याचे सहा मार्ग",
      ta: "சிறந்த கிரெடிட் ஸ்கோருக்கு கிரெடிட் கார்டைப் பயன்படுத்தும் ஆறு வழிகள்",
    },
    image: `${TEASER}/six-ways-you-can-use-credit-card-for-optimum-credit-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208485030/credit-tips.jpeg`,
  },
  {
    title: {
      en: "Millennials Guide for Building A Healthy Credit Profile",
      hi: "मिलेनियल्स के लिए स्वस्थ क्रेडिट प्रोफ़ाइल बनाने की गाइड",
      mr: "निरोगी क्रेडिट प्रोफाइल घडवण्यासाठी मिलेनियल्ससाठी मार्गदर्शक",
      ta: "ஆரோக்கியமான கிரெடிட் சுயவிவரம் உருவாக்க மில்லேனியல்களுக்கான வழிகாட்டி",
    },
  },
  {
    title: {
      en: "Does a Failed Credit Card Payment Pull Down Your CIBIL Score?",
      hi: "क्या क्रेडिट कार्ड का एक चूका भुगतान CIBIL स्कोर गिरा देता है?",
      mr: "क्रेडिट कार्डचा चुकलेला एक हप्ता CIBIL स्कोअर खाली आणतो का?",
      ta: "தவறிய கிரெடிட் கார்டு பணம் செலுத்துதல் CIBIL ஸ்கோரைக் குறைக்குமா?",
    },
  },
  {
    title: {
      en: "Achieve Your Dreams This Festive Season Through Responsible Credit Use",
      hi: "इस त्योहारी सीज़न ज़िम्मेदार क्रेडिट से पूरे करें अपने सपने",
      mr: "यंदाच्या सणासुदीत जबाबदार क्रेडिट वापरातून पूर्ण करा तुमची स्वप्ने",
      ta: "இந்தப் பண்டிகைக் காலத்தில் பொறுப்பான கடன் பயன்பாட்டால் கனவுகளை நிறைவேற்றுங்கள்",
    },
  },
  {
    title: {
      en: "Decoding Gold Loan: Understanding the Credit Value of Gold",
      hi: "गोल्ड लोन की एबीसी: समझिए सोने की क्रेडिट कीमत",
      mr: "गोल्ड लोनचा उलगडा: सोन्याचे क्रेडिट मूल्य समजून घ्या",
      ta: "தங்கக் கடனை புரிந்துகொள்வோம்: தங்கத்தின் கடன் மதிப்பு என்ன?",
    },
  },
  {
    title: {
      en: "Credit Matters, at Every Important Stage in Your Life",
      hi: "ज़िंदगी के हर अहम मोड़ पर मायने रखता है क्रेडिट",
      mr: "आयुष्याच्या प्रत्येक महत्त्वाच्या टप्प्यावर क्रेडिट महत्त्वाचे",
      ta: "வாழ்க்கையின் ஒவ்வொரு முக்கியக் கட்டத்திலும் கடன் முக்கியம்",
    },
  },
  {
    title: {
      en: "Seven Money-Management Lessons for Women",
      hi: "महिलाओं के लिए पैसों के प्रबंधन के सात सबक",
      mr: "महिलांसाठी पैशाच्या नियोजनाचे सात धडे",
      ta: "பெண்களுக்கான ஏழு பண மேலாண்மைப் பாடங்கள்",
    },
  },
  {
    title: {
      en: "A smart borrowing strategy for long-term financial health",
      hi: "लंबी अवधि की वित्तीय सेहत के लिए समझदार उधारी की रणनीति",
      mr: "दीर्घकालीन आर्थिक आरोग्यासाठी हुशार कर्जनीती",
      ta: "நீண்டகால நிதி ஆரோக்கியத்திற்கான புத்திசாலியான கடன் உத்தி",
    },
  },
  {
    title: {
      en: "Be the Boss Of Your Own Money",
      hi: "अपने पैसे के मालिक खुद बनिए",
      mr: "तुमच्या पैशाचे मालक तुम्हीच व्हा",
      ta: "உங்கள் பணத்திற்கு நீங்களே எஜமானராகுங்கள்",
    },
  },
  {
    title: {
      en: "The Power of Good Credit Habits",
      hi: "अच्छी क्रेडिट आदतों की ताकत",
      mr: "चांगल्या क्रेडिट सवयींची ताकद",
      ta: "நல்ல கடன் பழக்கங்களின் வலிமை",
    },
  },
  {
    title: {
      en: "Your Checklist for a Credit-Positive Start to the New Financial Year",
      hi: "नए वित्तीय वर्ष की क्रेडिट-मज़बूत शुरुआत के लिए आपकी चेकलिस्ट",
      mr: "नव्या आर्थिक वर्षाची क्रेडिट-सकारात्मक सुरुवात करण्यासाठी तुमची चेकलिस्ट",
      ta: "புதிய நிதியாண்டைக் கடன்-நேர்மறையாகத் தொடங்க உங்கள் சரிபார்ப்புப் பட்டியல்",
    },
  },
  {
    title: {
      en: "Love, Marriage, and CIBIL Scores: Why Your Financial Health Matters",
      hi: "प्यार, शादी और CIBIL स्कोर: क्यों मायने रखती है आपकी वित्तीय सेहत",
      mr: "प्रेम, लग्न आणि CIBIL स्कोअर: तुमचे आर्थिक आरोग्य का महत्त्वाचे",
      ta: "காதல், திருமணம், CIBIL ஸ்கோர்: உங்கள் நிதி ஆரோக்கியம் ஏன் முக்கியம்",
    },
  },
  {
    title: {
      en: "What is a CIBIL Score ?",
      hi: "CIBIL स्कोर क्या है?",
      mr: "CIBIL स्कोअर म्हणजे काय?",
      ta: "CIBIL ஸ்கோர் என்றால் என்ன?",
    },
  },
  {
    title: {
      en: "CIBIL Quest: The Path to Creditworthiness",
      hi: "CIBIL Quest: क्रेडिट साख तक पहुँचने का सफ़र",
      mr: "CIBIL Quest: पतपात्रतेकडे नेणारा प्रवास",
      ta: "CIBIL Quest: கடன் தகுதியை நோக்கிய பயணம்",
    },
  },
  {
    title: {
      en: "Game On: Level Up Your Fraud Defense with Data Encryption",
      hi: "गेम ऑन: डेटा एन्क्रिप्शन से मज़बूत करें फ्रॉड से बचाव",
      mr: "गेम ऑन: डेटा एन्क्रिप्शनने वाढवा फसवणुकीपासूनचे संरक्षण",
      ta: "ஆட்டம் தொடங்கியது: தரவு குறியாக்கத்தால் மோசடிக் காப்பை உயர்த்துங்கள்",
    },
  },
  {
    title: {
      en: "Click, Check, Control: Check Your Free CIBIL Score Once a Calendar Year",
      hi: "क्लिक करें, जाँचें, नियंत्रण रखें: साल में एक बार देखें मुफ़्त CIBIL स्कोर",
      mr: "क्लिक करा, तपासा, नियंत्रण ठेवा: वर्षातून एकदा पाहा मोफत CIBIL स्कोअर",
      ta: "கிளிக், சரிபார், கட்டுப்படுத்து: ஆண்டுக்கு ஒருமுறை இலவச CIBIL ஸ்கோரைப் பாருங்கள்",
    },
  },
  {
    title: {
      en: "Credit Marathon: How to Train Your Way to a Strong Credit History",
      hi: "क्रेडिट मैराथन: मज़बूत क्रेडिट इतिहास के लिए तैयारी कैसे करें",
      mr: "क्रेडिट मॅरेथॉन: भक्कम क्रेडिट इतिहासासाठी सराव कसा कराल",
      ta: "கடன் மாரத்தான்: வலுவான கடன் வரலாற்றை உருவாக்கப் பயிற்சி எப்படி",
    },
  },
  {
    title: {
      en: "Closing a Credit Card? Here's Your Do's and Don'ts Checklist",
      hi: "क्रेडिट कार्ड बंद कर रहे हैं? ये करें और ये बिल्कुल न करें",
      mr: "क्रेडिट कार्ड बंद करताय? हे करा आणि हे मुळीच करू नका",
      ta: "கிரெடிட் கார்டை மூடுகிறீர்களா? செய்ய வேண்டியவை, தவிர்க்க வேண்டியவை",
    },
  },
  {
    title: {
      en: "Before You Drive Off - Key Checks Prior to Applying for a Car Loan",
      hi: "गाड़ी निकालने से पहले — कार लोन के आवेदन से पूर्व ज़रूरी जाँच",
      mr: "गाडी रस्त्यावर आणण्याआधी — कार कर्जाच्या अर्जापूर्वीच्या महत्त्वाच्या तपासण्या",
      ta: "காரை ஓட்டத் தொடங்கும் முன் — கார் கடனுக்கு விண்ணப்பிக்கும் முன் அவசியச் சரிபார்ப்புகள்",
    },
  },
  {
    title: {
      en: "When the Rates Slow You Down, Let Your Finances Catch Up",
      hi: "जब ब्याज दरें रफ़्तार रोकें, तब संभालें अपनी वित्तीय गाड़ी",
      mr: "व्याजदर वेग रोखत असतील, तेव्हा आर्थिक घडी नीट बसवा",
      ta: "வட்டி விகிதங்கள் வேகத்தைக் குறைக்கும்போது உங்கள் நிதியைச் சரிசெய்யுங்கள்",
    },
  },
  {
    title: {
      en: "Celebrate more, Worry Less: Smarter Spending This Festive Season",
      hi: "जश्न ज़्यादा, चिंता कम: इस त्योहारी सीज़न खर्च करें समझदारी से",
      mr: "आनंद जास्त, काळजी कमी: यंदाच्या सणासुदीत खर्च करा शहाणपणाने",
      ta: "கொண்டாட்டம் அதிகம், கவலை குறைவு: இந்தப் பண்டிகைக்கு விவேகமான செலவு",
    },
  },
  {
    title: {
      en: "From Cart to Credit Shopping Wisely Online and Offline",
      hi: "कार्ट से क्रेडिट तक: ऑनलाइन और ऑफलाइन खरीदारी समझदारी से",
      mr: "कार्टपासून क्रेडिटपर्यंत: ऑनलाइन आणि ऑफलाइन खरेदी शहाणपणाने",
      ta: "கார்ட் முதல் கடன் வரை: ஆன்லைன், ஆஃப்லைன் ஷாப்பிங்கில் விவேகம்",
    },
  },
  {
    title: {
      en: "The Golden Touch: How Rising Prices Impact Your Festive & Family Plans",
      hi: "सोने की चमक: बढ़ती कीमतें कैसे बदलती हैं त्योहार और परिवार की योजनाएँ",
      mr: "सोन्याची झळाळी: वाढते भाव सणासुदीच्या आणि कुटुंबाच्या नियोजनावर कसा परिणाम करतात",
      ta: "தங்கத்தின் மெருகு: உயரும் விலைகள் பண்டிகை, குடும்பத் திட்டங்களை எப்படிப் பாதிக்கின்றன",
    },
  },
  {
    title: {
      en: "Festive Season Finance: Gold Loans, Personal Loans and Your CIBIL Score",
      hi: "त्योहारी सीज़न का वित्त: गोल्ड लोन, पर्सनल लोन और आपका CIBIL स्कोर",
      mr: "सणासुदीचे अर्थकारण: गोल्ड लोन, पर्सनल लोन आणि तुमचा CIBIL स्कोअर",
      ta: "பண்டிகைக் கால நிதி: தங்கக் கடன், தனிநபர் கடன், உங்கள் CIBIL ஸ்கோர்",
    },
  },
  {
    title: {
      en: "Vacation on Your Mind? Credit by Your Side!",
      hi: "छुट्टियों का प्लान बन रहा है? क्रेडिट है आपके साथ!",
      mr: "सुट्टीचा बेत आखताय? क्रेडिट आहे तुमच्या सोबतीला!",
      ta: "விடுமுறைப் பயணம் மனதில் உள்ளதா? கடன் உங்கள் துணையாக!",
    },
  },
  {
    title: {
      en: "Financing Forever: Credit Choices Before and After the Wedding",
      hi: "उम्र भर का साथ, समझदार क्रेडिट के साथ: शादी से पहले और बाद के फैसले",
      mr: "आयुष्यभराची साथ: लग्नाआधीचे आणि लग्नानंतरचे क्रेडिट निर्णय",
      ta: "என்றென்றும் நிதி உறுதி: திருமணத்திற்கு முன்பும் பின்பும் கடன் தேர்வுகள்",
    },
  },
  {
    title: {
      en: "Swipe Smart: How your mind shapes your credit habits",
      hi: "सोच-समझकर स्वाइप करें: आपका मन कैसे गढ़ता है क्रेडिट की आदतें",
      mr: "विचारपूर्वक स्वाइप करा: तुमचे मन क्रेडिट सवयी कशा घडवते",
      ta: "யோசித்து ஸ்வைப் செய்யுங்கள்: உங்கள் மனம் கடன் பழக்கங்களை எப்படி வடிவமைக்கிறது",
    },
  },
  {
    title: {
      en: "Stay Merry This Festive Season: Keep Your CIBIL Score Sparkling!",
      hi: "इस त्योहार खुशियाँ बरकरार: CIBIL स्कोर भी रखें चमकदार!",
      mr: "यंदाचा सण राहो आनंदाचा: CIBIL स्कोअरही ठेवा झळाळता!",
      ta: "இந்தப் பண்டிகை மகிழ்ச்சியாக இருக்கட்டும்: CIBIL ஸ்கோரையும் ஒளிரவிடுங்கள்!",
    },
  },
  {
    title: {
      en: "Your Credit Health Cheat Sheet: How to Stick to Your Financial New Year Resolutions",
      hi: "क्रेडिट सेहत की चीट शीट: नए साल के वित्तीय संकल्पों पर कैसे टिके रहें",
      mr: "क्रेडिट आरोग्याची चीट शीट: नववर्षाचे आर्थिक संकल्प कसे टिकवाल",
      ta: "கடன் ஆரோக்கியக் குறிப்பேடு: புத்தாண்டு நிதி உறுதிமொழிகளில் நிலைப்பது எப்படி",
    },
  },
  {
    title: {
      en: "Credit Mix Made Simple: Why the Right Balance Matters for Your Credit Health",
      hi: "क्रेडिट मिक्स आसान भाषा में: सही संतुलन क्यों है क्रेडिट सेहत के लिए ज़रूरी",
      mr: "क्रेडिट मिक्स सोप्या शब्दांत: योग्य समतोल क्रेडिट आरोग्यासाठी का महत्त्वाचा",
      ta: "கடன் கலவை எளிமையாக: சரியான சமநிலை உங்கள் கடன் ஆரோக்கியத்திற்கு ஏன் அவசியம்",
    },
  },
  {
    title: {
      en: 'Web-Through: Reading "Accounts" & "Enquiries" Sections in Your CIBIL Report',
      hi: 'वेब-थ्रू: अपनी CIBIL रिपोर्ट के "Accounts" और "Enquiries" सेक्शन कैसे पढ़ें',
      mr: 'वेब-थ्रू: तुमच्या CIBIL अहवालातील "Accounts" व "Enquiries" विभाग कसे वाचावेत',
      ta: 'வெப்-த்ரூ: உங்கள் CIBIL அறிக்கையின் "Accounts", "Enquiries" பகுதிகளைப் படிப்பது எப்படி',
    },
  },
  {
    title: {
      en: "Why Your CIBIL Score Matters Beyond Loan Approvals",
      hi: "लोन मंज़ूरी से आगे भी क्यों मायने रखता है आपका CIBIL स्कोर",
      mr: "कर्ज मंजुरीपलीकडेही तुमचा CIBIL स्कोअर का महत्त्वाचा",
      ta: "கடன் ஒப்புதலைத் தாண்டியும் உங்கள் CIBIL ஸ்கோர் ஏன் முக்கியம்",
    },
  },
  {
    title: {
      en: "Credit Setup: How to Build a Habit Stacked Credit Routine That Actually Sticks",
      hi: "क्रेडिट सेटअप: ऐसी क्रेडिट दिनचर्या बनाएँ जो सच में टिकी रहे",
      mr: "क्रेडिट सेटअप: खरोखर टिकणारी क्रेडिट दिनचर्या कशी घडवाल",
      ta: "கடன் அமைப்பு: உண்மையிலேயே நீடிக்கும் கடன் வழக்கத்தை உருவாக்குவது எப்படி",
    },
  },
  {
    title: {
      en: "New Credit Card? Your Storybook of Healthy Credit Habits Begins Here",
      hi: "नया क्रेडिट कार्ड? यहीं से शुरू होती है अच्छी क्रेडिट आदतों की कहानी",
      mr: "नवीन क्रेडिट कार्ड? इथूनच सुरू होते चांगल्या क्रेडिट सवयींची गोष्ट",
      ta: "புதிய கிரெடிட் கார்டா? நல்ல கடன் பழக்கங்களின் கதை இங்கிருந்தே தொடங்குகிறது",
    },
  },
  {
    title: {
      en: "Holiday Season Without the after-effects: Think of Your Credit Card Like Your Vacation Buddy",
      hi: "बिना पछतावे वाली छुट्टियाँ: क्रेडिट कार्ड को समझें सफ़र का साथी",
      mr: "पश्चात्तापाशिवाय सुट्टी: क्रेडिट कार्डकडे पाहा प्रवासातील सोबती म्हणून",
      ta: "வருத்தமில்லாத விடுமுறை: கிரெடிட் கார்டை உங்கள் பயணத் தோழனாக நினையுங்கள்",
    },
  },
  {
    title: {
      en: "Optimizing Credit Is Expanding Credit: Why Discipline Matters",
      hi: "क्रेडिट का सही उपयोग ही है क्रेडिट का विस्तार: अनुशासन क्यों ज़रूरी है",
      mr: "क्रेडिटचा योग्य वापर हाच क्रेडिटचा विस्तार: शिस्त का महत्त्वाची",
      ta: "கடனைச் சரியாகப் பயன்படுத்துவதே கடனை விரிவாக்குவது: ஒழுக்கம் ஏன் முக்கியம்",
    },
  },
];

export const CREDIT_MYTHS_CARDS: BlogCard[] = [
  {
    title: {
      en: "Can You Bounce Back From A Low CIBIL Score?",
      hi: "क्या कम CIBIL स्कोर से उबरना मुमकिन है?",
      mr: "कमी CIBIL स्कोअरमधून सावरणे शक्य आहे का?",
      ta: "குறைந்த CIBIL ஸ்கோரிலிருந்து மீள முடியுமா?",
    },
    image: `${TEASER}/can-you-bounce-back-from-a-low-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802879/bounce-from-low-cibil-myths.jpeg`,
  },
  {
    title: {
      en: 'Impact Of "Settled" Status On Your CIBIL Score',
      hi: 'आपके CIBIL स्कोर पर "Settled" स्टेटस का असर',
      mr: 'तुमच्या CIBIL स्कोअरवर "Settled" स्थितीचा परिणाम',
      ta: 'உங்கள் CIBIL ஸ்கோரில் "Settled" நிலையின் தாக்கம்',
    },
    image: `${TEASER}/impact-of-settled-status-on-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208539815/settledstatus.jpeg`,
  },
];

export const WATCH_LEARN_CARDS: BlogCard[] = [
  {
    title: {
      en: "Understanding the key features of your CIBIL Report",
      hi: "अपनी CIBIL रिपोर्ट की अहम बातें समझिए",
      mr: "तुमच्या CIBIL अहवालातील महत्त्वाची वैशिष्ट्ये समजून घ्या",
      ta: "உங்கள் CIBIL அறிக்கையின் முக்கிய அம்சங்களைப் புரிந்துகொள்ளுங்கள்",
    },
    image: `${TEASER}/understand-the-key-features-of-your-cibil-report/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1729610114846/new-cibil-score-new.jpeg`,
  },
  {
    title: {
      en: "Credit-Readiness Begins With Good Credit Habits",
      hi: "क्रेडिट के लिए तैयारी शुरू होती है अच्छी क्रेडिट आदतों से",
      mr: "क्रेडिट-सज्जतेची सुरुवात चांगल्या क्रेडिट सवयींतून होते",
      ta: "கடன் தயார்நிலை நல்ல கடன் பழக்கங்களில் தொடங்குகிறது",
    },
    image: `${TEASER}/how-to-be-credit-ready-with-good-credit-habits/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208490141/goodcredithabit.jpeg`,
  },
  {
    title: {
      en: "How To Shop Without Worrying About Any Impact To Your CIBIL Score",
      hi: "खरीदारी करें बेफ़िक्र होकर, CIBIL स्कोर पर बिना असर डाले",
      mr: "CIBIL स्कोअरची चिंता न करता खरेदी कशी कराल",
      ta: "CIBIL ஸ்கோரைப் பற்றிக் கவலைப்படாமல் ஷாப்பிங் செய்வது எப்படி",
    },
    image: `${TEASER}/how-to-shop-without-worrying-about-any-impact-to-your-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208490218/how-to-shop-without-worrying-about-cibil.jpeg`,
  },
  {
    title: {
      en: "Top 5 Tips To Boost Your Credit Health",
      hi: "क्रेडिट सेहत सुधारने के 5 बेहतरीन टिप्स",
      mr: "क्रेडिट आरोग्य सुधारण्यासाठी 5 उत्तम टिप्स",
      ta: "உங்கள் கடன் ஆரோக்கியத்தை மேம்படுத்த 5 சிறந்த குறிப்புகள்",
    },
    image: `${TEASER}/top-5-tips-to-boost-your-credit-health/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208810690/top-5-tips-to-boost-your-credit-health.jpeg`,
  },
];

/** Hero band artwork for the Commercial Credit listing page. */
export const COMMERCIAL_CREDIT_HERO =
  "https://www.cibil.com/content/dam/cibil/blog/commercialcredit.jpeg";

export const COMMERCIAL_CREDIT_CARDS: BlogCard[] = [
  {
    title: {
      en: "10 Ways to Manage your Business Finances Effectively",
      hi: "अपने कारोबार की वित्तीय व्यवस्था बेहतर ढंग से संभालने के 10 तरीके",
      mr: "तुमच्या व्यवसायाचे अर्थकारण प्रभावीपणे सांभाळण्याचे 10 मार्ग",
      ta: "உங்கள் வணிக நிதியைத் திறம்பட நிர்வகிக்க 10 வழிகள்",
    },
    image: `${TEASER}/ten-ways-to-manage-your-business-finances-effectively/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803500/10ways.jpeg`,
  },
  {
    title: {
      en: "Fast Track Your Business Plans With CIBIL Rank",
      hi: "CIBIL Rank के साथ रफ़्तार दें अपनी कारोबारी योजनाओं को",
      mr: "CIBIL Rank च्या जोरावर तुमच्या व्यवसाय योजनांना वेग द्या",
      ta: "CIBIL Rank மூலம் உங்கள் வணிகத் திட்டங்களை விரைவுபடுத்துங்கள்",
    },
    image: `${TEASER}/fast-track-your-business-plans-with-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1761539431514/commercialrank.jpeg`,
  },
  {
    title: {
      en: "Unlocking potential with CIBIL rank & Company Credit Report",
      hi: "CIBIL Rank और Company Credit Report से खोलें विकास के नए रास्ते",
      mr: "CIBIL Rank आणि Company Credit Report मधून उलगडा व्यवसायाची क्षमता",
      ta: "CIBIL Rank மற்றும் Company Credit Report மூலம் வளர்ச்சி வாய்ப்புகளைத் திறங்கள்",
    },
    image: `${TEASER}/unlocking-potential-with-cibil-rank-and-company-credit-report/_jcr_content/teaserImage.coreimg.75.1440.png/1722229713093/potentialwithcibilrank.png`,
  },
  {
    title: {
      en: "How to Supercharge Business Loan Eligibility",
      hi: "बिज़नेस लोन की पात्रता कैसे बनाएँ और मज़बूत",
      mr: "व्यवसाय कर्जाची पात्रता अधिक भक्कम कशी कराल",
      ta: "வணிகக் கடன் தகுதியை எப்படிப் பலப்படுத்துவது",
    },
    image: `${TEASER}/how-to-supercharge-business-loan-eligibility/_jcr_content/teaserImage.coreimg.75.1440.png/1722229710083/superchargebussinessloan.png`,
  },
  {
    title: {
      en: "Good Credit Habits for a business, for a Strong CIBIL Rank",
      hi: "मज़बूत CIBIL Rank के लिए कारोबार की अच्छी क्रेडिट आदतें",
      mr: "भक्कम CIBIL Rank साठी व्यवसायाच्या चांगल्या क्रेडिट सवयी",
      ta: "வலுவான CIBIL Rank-க்கு வணிகத்தின் நல்ல கடன் பழக்கங்கள்",
    },
    image: `${TEASER}/good-credit-habits-for-a-business-for-a-strong-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.png/1722229709828/goodcredithabitsbussiness.png`,
  },
  {
    title: {
      en: "6 Money-Management Tips For Budding Entrepreneurs",
      hi: "नए उद्यमियों के लिए पैसों के प्रबंधन की 6 सलाहें",
      mr: "नवोदित उद्योजकांसाठी पैशाच्या नियोजनाच्या 6 टिप्स",
      ta: "புதிய தொழில்முனைவோருக்கான 6 பண மேலாண்மைக் குறிப்புகள்",
    },
    image: `${TEASER}/six-money-management-tips-for-budding-entrepreneurs/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468338/tips-on-starting-a-new-business.png`,
  },
  {
    title: {
      en: "How Financial Self-Reliance Can Improve Your Quality of Life",
      hi: "आर्थिक आत्मनिर्भरता कैसे बेहतर बनाती है आपके जीवन की गुणवत्ता",
      mr: "आर्थिक स्वावलंबन तुमच्या जीवनाचा दर्जा कसा उंचावते",
      ta: "நிதிச் சுயசார்பு உங்கள் வாழ்க்கைத் தரத்தை எப்படி உயர்த்துகிறது",
    },
    image: `${TEASER}/how-financial-self-reliance-can-improve-your-quality-of-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468084/upscaling-your-life.png`,
  },
  {
    title: {
      en: "From Cash Flow to Creditworthiness: How Small Businesses Can Improve Loan Eligibility",
      hi: "कैश फ्लो से क्रेडिट साख तक: छोटे कारोबार कैसे बढ़ाएँ अपनी लोन पात्रता",
      mr: "रोख प्रवाहापासून पतपात्रतेपर्यंत: लहान व्यवसाय कर्जपात्रता कशी वाढवतील",
      ta: "பணப்புழக்கம் முதல் கடன் தகுதி வரை: சிறு வணிகங்கள் கடன் தகுதியை மேம்படுத்துவது எப்படி",
    },
    image: `${TEASER}/how-small-businesses-can-improve-loan-eligibility/_jcr_content/teaserImage.coreimg.75.1440.png/1747990208312/cash-flow-to-creditworthiness.png`,
  },
  {
    title: {
      en: "Your Guide To Securing A Business Loan",
      hi: "बिज़नेस लोन पाने की आपकी पूरी गाइड",
      mr: "व्यवसाय कर्ज मिळवण्यासाठी तुमचे संपूर्ण मार्गदर्शक",
      ta: "வணிகக் கடன் பெறுவதற்கான உங்கள் வழிகாட்டி",
    },
    image: `${TEASER}/guide-to-securing-business-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1742187624937/business-loan.jpeg`,
  },
  {
    title: {
      en: "Business Success That is Built on the Pillars of Financial Discipline",
      hi: "वित्तीय अनुशासन के खंभों पर टिकी कारोबारी सफलता",
      mr: "आर्थिक शिस्तीच्या पायावर उभी राहणारी व्यावसायिक यशोगाथा",
      ta: "நிதி ஒழுக்கத்தின் தூண்களில் எழும் வணிக வெற்றி",
    },
    image: `${TEASER}/business-success-that-is-built-on-the-pillars-of-financial-discipline/_jcr_content/teaserImage.coreimg.75.1440.png/1758780197212/business-financial-discipline.png`,
  },
  {
    title: {
      en: "Common Credit Mistakes Entrepreneurs Make and How to Avoid Them",
      hi: "उद्यमियों की आम क्रेडिट गलतियाँ और उनसे बचने के तरीके",
      mr: "उद्योजक करतात त्या सामान्य क्रेडिट चुका आणि त्या टाळण्याचे मार्ग",
      ta: "தொழில்முனைவோர் செய்யும் பொதுவான கடன் தவறுகளும் அவற்றைத் தவிர்க்கும் வழிகளும்",
    },
    image: `${TEASER}/common-credit-mistakes-entrepreneurs-make-and-how-to-avoid-them/_jcr_content/teaserImage.coreimg.75.1440.png/1776251374024/common-credit-mistakes.png`,
  },
  {
    title: {
      en: "A Simple Guide to Understanding your Company's Credit Health",
      hi: "अपनी कंपनी की क्रेडिट सेहत समझने की सरल गाइड",
      mr: "तुमच्या कंपनीचे क्रेडिट आरोग्य समजून घेण्यासाठी सोपे मार्गदर्शक",
      ta: "உங்கள் நிறுவனத்தின் கடன் ஆரோக்கியத்தைப் புரிந்துகொள்ள எளிய வழிகாட்டி",
    },
    image: `${TEASER}/a-simple-guide-to-understanding-your-companys-credit-health/_jcr_content/teaserImage.coreimg.75.1440.png/1779356496301/blog3-company-s-credit-health.png`,
  },
  {
    title: {
      en: "What is CIBIL RANK and COMPANY CREDIT REPORT (CCR)?",
      hi: "CIBIL RANK और COMPANY CREDIT REPORT (CCR) क्या होते हैं?",
      mr: "CIBIL RANK आणि COMPANY CREDIT REPORT (CCR) म्हणजे काय?",
      ta: "CIBIL RANK மற்றும் COMPANY CREDIT REPORT (CCR) என்றால் என்ன?",
    },
    image: `${TEASER}/what-is-cibil-rank-and-company-credit-report-ccr/_jcr_content/teaserImage.coreimg.75.1440.png/1779364217365/blog-4-cibil-rank-and-company-credit-report--ccr-.png`,
  },
  {
    title: {
      en: "How Lenders Evaluate Your Company Credit Report Before Approving Loans",
      hi: "लोन मंज़ूर करने से पहले ऋणदाता कैसे परखते हैं आपकी Company Credit Report",
      mr: "कर्ज मंजूर करण्यापूर्वी कर्जदाते तुमचा Company Credit Report कसा तपासतात",
      ta: "கடனை ஒப்புதல் அளிக்கும் முன் கடன் வழங்குநர்கள் உங்கள் Company Credit Report-ஐ எப்படி மதிப்பிடுகின்றனர்",
    },
    image: `${TEASER}/how-lenders-evaluate-your-company-credit-report-before-approving-loans/_jcr_content/teaserImage.coreimg.75.1440.png/1779439097329/blog-5-how-lenders-evaluate.png`,
  },
  {
    title: {
      en: "From Transactions to Trust: How Your Business Activity Shapes Your CIBIL Rank",
      hi: "लेन-देन से भरोसे तक: आपकी कारोबारी गतिविधि कैसे तय करती है आपका CIBIL Rank",
      mr: "व्यवहारांपासून विश्वासापर्यंत: तुमची व्यावसायिक हालचाल CIBIL Rank कसा घडवते",
      ta: "பரிவர்த்தனைகள் முதல் நம்பிக்கை வரை: உங்கள் வணிகச் செயல்பாடு CIBIL Rank-ஐ எப்படி வடிவமைக்கிறது",
    },
    image: `${TEASER}/from-transactions-to-trust-how-your-business-activity-shapes-your-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.png/1781169183290/blog2-from-transactions-to-trust.png`,
  },
];

/** Hero band artwork for the New To Credit listing page. */
export const NEW_TO_CREDIT_HERO =
  "https://www.cibil.com/content/dam/cibil/consumer/credit-advice.jpg";

export const NEW_TO_CREDIT_CARDS: BlogCard[] = [
  {
    title: {
      en: "What is a CIBIL Score ?",
      hi: "CIBIL स्कोर क्या है?",
      mr: "CIBIL स्कोअर म्हणजे काय?",
      ta: "CIBIL ஸ்கோர் என்றால் என்ன?",
    },
    image: `${TEASER}/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg`,
  },
  {
    title: {
      en: "New-to-credit? Here's how to maintain a healthy CIBIL score",
      hi: "क्रेडिट में नए हैं? ऐसे बनाए रखें स्वस्थ CIBIL स्कोर",
      mr: "क्रेडिटमध्ये नवीन आहात? असा टिकवा निरोगी CIBIL स्कोअर",
      ta: "கடனுக்குப் புதியவரா? ஆரோக்கியமான CIBIL ஸ்கோரை இப்படிப் பேணுங்கள்",
    },
    image: `${TEASER}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.png/1699255129917/ntc-credit.png`,
  },
  {
    title: {
      en: "Five Easy to Meet Credit Resolutions for the New Year",
      hi: "नए साल के लिए आसानी से निभने वाले पाँच क्रेडिट संकल्प",
      mr: "नववर्षासाठी सहज पाळता येतील असे पाच क्रेडिट संकल्प",
      ta: "புத்தாண்டுக்கான எளிதில் நிறைவேற்றக்கூடிய ஐந்து கடன் உறுதிமொழிகள்",
    },
    image: `${TEASER}/five-easy-to-meet-credit-resolutions-for-the-new-year/_jcr_content/teaserImage.coreimg.75.1440.png/1685047513410/new-year.png`,
  },
  {
    title: {
      en: "First-time users guide to establishing credit",
      hi: "पहली बार क्रेडिट लेने वालों के लिए शुरुआती गाइड",
      mr: "पहिल्यांदाच क्रेडिट घेणाऱ्यांसाठी मार्गदर्शक",
      ta: "முதன்முறை கடன் தொடங்குபவர்களுக்கான வழிகாட்டி",
    },
    image: `${TEASER}/first-time-users-guide-to-establishing-credit-infographic/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png`,
  },
];
