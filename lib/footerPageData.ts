/**
 * Content data for the footer-linked pages, transcribed from the source site.
 * Company milestones, the suit-filed overview copy and the RBI circular table are all user-visible
 * prose, so — like every other string on the site — they are carried in all four locales.
 * Each export is keyed by `Language`; every locale holds the same number of entries in the same
 * order as `en`. Brand names, product names, statutory references and ₹ amounts stay in Latin script.
 */

import type { Language } from "@/lib/i18n";

export interface TimelineEntry {
  year: string;
  paras: string[];
  bullets?: string[];
}

export const COMPANY_HISTORY: Record<Language, TimelineEntry[]> = {
  en: [
    { year: "2000", paras: ["TransUnion CIBIL Limited (formerly Credit Information Bureau (India) Limited) was incorporated based on recommendations made by the RBI Siddiqui Committee."] },
    { year: "2004", paras: ["Credit bureau services are launched in India (Consumer Bureau)."] },
    { year: "2006", paras: ["Commercial bureau operations commenced."] },
    { year: "2007", paras: ["CIBIL Score, India's first generic risk scoring model for banks and financial institutions, was introduced."] },
    {
      year: "2010",
      paras: ["Two firsts for the credit industry in India with the launch of:"],
      bullets: [
        "CIBIL Detect: India's first repository for information on high-risk activity.",
        "CIBIL Mortgage Check: The first centralized database on mortgages in India.",
      ],
    },
    { year: "2011", paras: ["Empowering Consumers- Direct access to CIBIL Report and Score through online and offline mode made available to consumers"] },
    {
      year: "2017",
      paras: [
        "TransUnion acquired a 92.1% stake in CIBIL.",
        "CreditVision is launched to expand the eligible consumer base and drive access to finance for many more deserving consumers.",
        "Free Annual Credit Report (FACR) is made available to individual consumers",
        "CIBIL MSME Rank (CMR) to assess the credit risk ranking of Micro, Small and Medium Enterprises (MSMEs) is introduced.",
      ],
    },
    { year: "2018", paras: ['SIDBI and TransUnion CIBIL launch "MSME Pulse" – India\'s largest study based on over 5 million active MSMEs.'] },
    { year: "2021", paras: ["TransUnion CIBIL Credit Market Indicator launched to chart health of India's Retail Lending Market"] },
    { year: "2023", paras: ["Launched MFI Score based on Joint Liability Group undertakings, to facilitate digital and centralized underwriting and drive financial inclusion."] },
    { year: "2024", paras: ["Launched new solutions like API Market place, NTC 2.0, Early Risk Score, MFI Batch."] },
    {
      year: "2025",
      paras: [
        "Launched CreditVision® CIBIL Commercial Rank and as well as other flagship solutions",
        "Marked CIBIL's 25th anniversary by elevating the 15th Annual Credit Conference into a defining industry event, graced by stalwarts and thought leaders from across the credit landscape..",
      ],
    },
  ],
  hi: [
    { year: "2000", paras: ["TransUnion CIBIL Limited (पूर्व में Credit Information Bureau (India) Limited) की स्थापना RBI की सिद्दीकी समिति द्वारा की गई अनुशंसाओं के आधार पर की गई।"] },
    { year: "2004", paras: ["भारत में क्रेडिट ब्यूरो सेवाएँ प्रारंभ की गईं (उपभोक्ता ब्यूरो)।"] },
    { year: "2006", paras: ["वाणिज्यिक ब्यूरो का संचालन प्रारंभ हुआ।"] },
    { year: "2007", paras: ["बैंकों और वित्तीय संस्थानों के लिए भारत का पहला सामान्य जोखिम स्कोरिंग मॉडल, CIBIL Score, प्रस्तुत किया गया।"] },
    {
      year: "2010",
      paras: ["इनके शुभारंभ के साथ भारत के क्रेडिट उद्योग के लिए दो पहली उपलब्धियाँ:"],
      bullets: [
        "CIBIL Detect: उच्च जोखिम वाली गतिविधियों की जानकारी के लिए भारत का पहला भंडार।",
        "CIBIL Mortgage Check: भारत में बंधक ऋणों का पहला केंद्रीकृत डेटाबेस।",
      ],
    },
    { year: "2011", paras: ["उपभोक्ताओं का सशक्तिकरण – ऑनलाइन और ऑफ़लाइन माध्यम से CIBIL Report तथा Score तक सीधी पहुँच उपभोक्ताओं को उपलब्ध कराई गई।"] },
    {
      year: "2017",
      paras: [
        "TransUnion ने CIBIL में 92.1% हिस्सेदारी अर्जित की।",
        "पात्र उपभोक्ता आधार का विस्तार करने तथा अधिक से अधिक योग्य उपभोक्ताओं तक वित्त की पहुँच बढ़ाने के लिए CreditVision प्रारंभ किया गया।",
        "व्यक्तिगत उपभोक्ताओं के लिए निःशुल्क वार्षिक क्रेडिट रिपोर्ट (FACR) उपलब्ध कराई गई।",
        "सूक्ष्म, लघु एवं मध्यम उद्यमों (MSME) की क्रेडिट जोखिम रैंकिंग के आकलन हेतु CIBIL MSME Rank (CMR) प्रस्तुत किया गया।",
      ],
    },
    { year: "2018", paras: ['SIDBI और TransUnion CIBIL ने "MSME Pulse" प्रारंभ किया – 50 लाख से अधिक सक्रिय MSME पर आधारित भारत का सबसे बड़ा अध्ययन।'] },
    { year: "2021", paras: ["भारत के खुदरा ऋण बाज़ार की स्थिति का आकलन करने के लिए TransUnion CIBIL Credit Market Indicator प्रारंभ किया गया।"] },
    { year: "2023", paras: ["डिजिटल एवं केंद्रीकृत अंडरराइटिंग को सुगम बनाने तथा वित्तीय समावेशन को बढ़ावा देने के लिए संयुक्त देयता समूह के उपक्रमों पर आधारित MFI Score प्रारंभ किया गया।"] },
    { year: "2024", paras: ["API Market place, NTC 2.0, Early Risk Score, MFI Batch जैसे नए समाधान प्रस्तुत किए गए।"] },
    {
      year: "2025",
      paras: [
        "CreditVision® CIBIL Commercial Rank तथा अन्य प्रमुख समाधान प्रस्तुत किए गए।",
        "15वें वार्षिक क्रेडिट सम्मेलन को उद्योग जगत के एक निर्णायक आयोजन के रूप में प्रतिष्ठित करते हुए CIBIL की 25वीं वर्षगाँठ मनाई गई, जिसमें क्रेडिट क्षेत्र के दिग्गज तथा विचारक शामिल हुए।",
      ],
    },
  ],
  mr: [
    { year: "2000", paras: ["TransUnion CIBIL Limited (पूर्वीचे Credit Information Bureau (India) Limited) ची स्थापना RBI च्या सिद्दिकी समितीने केलेल्या शिफारशींच्या आधारे करण्यात आली."] },
    { year: "2004", paras: ["भारतात क्रेडिट ब्यूरो सेवा सुरू करण्यात आल्या (ग्राहक ब्यूरो)."] },
    { year: "2006", paras: ["व्यावसायिक ब्यूरोचे कामकाज सुरू झाले."] },
    { year: "2007", paras: ["बँका व वित्तीय संस्थांसाठी भारतातील पहिले सर्वसाधारण जोखीम स्कोअरिंग मॉडेल असलेला CIBIL Score सादर करण्यात आला."] },
    {
      year: "2010",
      paras: ["पुढील सेवांच्या प्रारंभासह भारतातील पतउद्योगासाठी दोन प्रथमच घडलेल्या गोष्टी:"],
      bullets: [
        "CIBIL Detect: उच्च जोखमीच्या व्यवहारांविषयीच्या माहितीसाठी भारतातील पहिले भांडार.",
        "CIBIL Mortgage Check: भारतातील तारण कर्जांविषयीचा पहिला केंद्रीकृत डेटाबेस.",
      ],
    },
    { year: "2011", paras: ["ग्राहकांचे सक्षमीकरण – ऑनलाइन व ऑफलाइन माध्यमातून CIBIL Report आणि Score थेट पाहण्याची सुविधा ग्राहकांना उपलब्ध करून देण्यात आली."] },
    {
      year: "2017",
      paras: [
        "TransUnion ने CIBIL मध्ये 92.1% भागभांडवल संपादित केले.",
        "पात्र ग्राहकांचा पाया विस्तारण्यासाठी आणि अधिकाधिक पात्र ग्राहकांना वित्तपुरवठा उपलब्ध करून देण्यासाठी CreditVision सुरू करण्यात आले.",
        "वैयक्तिक ग्राहकांसाठी मोफत वार्षिक क्रेडिट अहवाल (FACR) उपलब्ध करून देण्यात आला.",
        "सूक्ष्म, लघु व मध्यम उद्योगांच्या (MSME) पतजोखीम क्रमवारीचे मूल्यांकन करण्यासाठी CIBIL MSME Rank (CMR) सादर करण्यात आला.",
      ],
    },
    { year: "2018", paras: ['SIDBI आणि TransUnion CIBIL यांनी "MSME Pulse" सुरू केले – 50 लाखांहून अधिक कार्यरत MSME वर आधारित भारतातील सर्वात मोठा अभ्यास.'] },
    { year: "2021", paras: ["भारताच्या किरकोळ कर्ज बाजाराच्या स्थितीचा आढावा घेण्यासाठी TransUnion CIBIL Credit Market Indicator सुरू करण्यात आले."] },
    { year: "2023", paras: ["डिजिटल व केंद्रीकृत अंडररायटिंग सुलभ करण्यासाठी आणि आर्थिक समावेशनाला चालना देण्यासाठी संयुक्त दायित्व गट उपक्रमांवर आधारित MFI Score सुरू करण्यात आला."] },
    { year: "2024", paras: ["API Market place, NTC 2.0, Early Risk Score, MFI Batch यांसारखी नवीन समाधाने सुरू करण्यात आली."] },
    {
      year: "2025",
      paras: [
        "CreditVision® CIBIL Commercial Rank तसेच इतर प्रमुख समाधाने सुरू करण्यात आली.",
        "15व्या वार्षिक क्रेडिट परिषदेला उद्योगक्षेत्रातील एका निर्णायक कार्यक्रमाचे स्वरूप देत CIBIL चा 25वा वर्धापन दिन साजरा करण्यात आला; या परिषदेला पतक्षेत्रातील मान्यवर व विचारवंत उपस्थित होते.",
      ],
    },
  ],
  ta: [
    { year: "2000", paras: ["RBI சித்திக்கி குழு அளித்த பரிந்துரைகளின் அடிப்படையில் TransUnion CIBIL Limited (முன்னர் Credit Information Bureau (India) Limited) நிறுவப்பட்டது."] },
    { year: "2004", paras: ["இந்தியாவில் கடன் பணியகச் சேவைகள் தொடங்கப்பட்டன (நுகர்வோர் பணியகம்)."] },
    { year: "2006", paras: ["வணிகப் பணியகச் செயல்பாடுகள் தொடங்கின."] },
    { year: "2007", paras: ["வங்கிகள் மற்றும் நிதி நிறுவனங்களுக்கான இந்தியாவின் முதல் பொதுவான இடர் மதிப்பீட்டு மாதிரியான CIBIL Score அறிமுகப்படுத்தப்பட்டது."] },
    {
      year: "2010",
      paras: ["பின்வருவனவற்றின் அறிமுகத்துடன் இந்தியக் கடன் துறையில் இரண்டு முதன்மைச் சாதனைகள்:"],
      bullets: [
        "CIBIL Detect: அதிக இடர் நடவடிக்கைகள் குறித்த தகவல்களுக்கான இந்தியாவின் முதல் தரவுக் களஞ்சியம்.",
        "CIBIL Mortgage Check: இந்தியாவில் அடமானங்கள் குறித்த முதல் மையப்படுத்தப்பட்ட தரவுத்தளம்.",
      ],
    },
    { year: "2011", paras: ["நுகர்வோர் அதிகாரமளிப்பு – ஆன்லைன் மற்றும் ஆஃப்லைன் முறையில் CIBIL Report மற்றும் Score-ஐ நேரடியாகப் பெறும் வசதி நுகர்வோருக்கு வழங்கப்பட்டது."] },
    {
      year: "2017",
      paras: [
        "TransUnion நிறுவனம் CIBIL-இல் 92.1% பங்குகளைக் கையகப்படுத்தியது.",
        "தகுதியான நுகர்வோர் தளத்தை விரிவுபடுத்தவும், மேலும் பல தகுதியுள்ள நுகர்வோருக்கு நிதி கிடைப்பதை ஊக்குவிக்கவும் CreditVision தொடங்கப்பட்டது.",
        "தனிநபர் நுகர்வோருக்கு இலவச ஆண்டு கடன் அறிக்கை (FACR) கிடைக்கச் செய்யப்பட்டது.",
        "குறு, சிறு மற்றும் நடுத்தர நிறுவனங்களின் (MSME) கடன் இடர் தரவரிசையை மதிப்பிட CIBIL MSME Rank (CMR) அறிமுகப்படுத்தப்பட்டது.",
      ],
    },
    { year: "2018", paras: ['SIDBI மற்றும் TransUnion CIBIL இணைந்து "MSME Pulse" தொடங்கின – 50 லட்சத்திற்கும் மேற்பட்ட செயலில் உள்ள MSME-களை அடிப்படையாகக் கொண்ட இந்தியாவின் மிகப்பெரிய ஆய்வு.'] },
    { year: "2021", paras: ["இந்தியாவின் சில்லறைக் கடன் சந்தையின் ஆரோக்கியத்தை வரையறுக்க TransUnion CIBIL Credit Market Indicator தொடங்கப்பட்டது."] },
    { year: "2023", paras: ["டிஜிட்டல் மற்றும் மையப்படுத்தப்பட்ட அண்டர்ரைட்டிங்கை எளிதாக்கவும், நிதிச் சேர்க்கையை ஊக்குவிக்கவும், இணைப் பொறுப்புக் குழு ஏற்பாடுகளின் அடிப்படையிலான MFI Score தொடங்கப்பட்டது."] },
    { year: "2024", paras: ["API Market place, NTC 2.0, Early Risk Score, MFI Batch போன்ற புதிய தீர்வுகள் அறிமுகப்படுத்தப்பட்டன."] },
    {
      year: "2025",
      paras: [
        "CreditVision® CIBIL Commercial Rank மற்றும் பிற முதன்மைத் தீர்வுகள் அறிமுகப்படுத்தப்பட்டன.",
        "கடன் துறை முழுவதிலுமிருந்து முன்னோடிகளும் சிந்தனையாளர்களும் கலந்துகொண்ட 15வது ஆண்டு கடன் மாநாட்டைத் துறையின் தலைசிறந்த நிகழ்வாக உயர்த்தி, CIBIL-இன் 25வது ஆண்டு நிறைவு கொண்டாடப்பட்டது.",
      ],
    },
  ],
};

export interface OverviewSection {
  heading: string;
  /** Body copy in the inline markup understood by `lib/richText.tsx` (`**bold**`, links, `- ` bullets). */
  body: string;
}

export const SUIT_FILED_OVERVIEW: Record<Language, OverviewSection[]> = {
  en: [
    {
      heading: "RBI Suit-Filed Accounts - An Overview",
      body: `TransUnion CIBIL Limited (Formerly: CIBIL) - India's first credit information bureau - has been established to cater to the credit information requirement of the financial sector and serves as an effective mechanism for curbing the growth of Non-Performing Assets (NPAs). The Reserve Bank of India (RBI) constituted a Working Group in December 2001 to examine the possibility of TransUnion CIBIL performing the role of collecting and disseminating information on suit-filed accounts and list of defaulters, being reported to RBI by banks and notified Financial Institutions (FIs).
RBI then decided to implement some of the recommendations of the Working Group, which satisfied the existing legal framework of the time. In their letter no: DL.BC.111/20.16.001/2001-02 dated June 4, 2002; RBI apprised banks, FIs and state financial corporations of the formation of TransUnion CIBIL and directed them to send, to TransUnion CIBIL as well as to RBI, data on:
- Suit-filed accounts of ₹ 1 Crore and above, and
- Suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above
Consequently, banks and FIs submitted the list of suit-filed accounts of ₹ 1 Crore and above, as on March 31, 2002 and quarterly updates thereof till December 2002, to TransUnion CIBIL as well as RBI. They also submitted the list of suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above as at the end of March, June, September and December 2002. Thereafter, from March 31, 2003 onwards, this data is being submitted to TransUnion CIBIL alone.
At present, TransUnion CIBIL is maintaining a database on suit-filed accounts of ₹ 1 Crore and above and suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above. This information is based on an application developed to enable the users to access data through a parameterised search process across banks and companies at various geographical locations. Suit-filed accounts of lower value are being covered in a phased manner.`,
    },
    {
      heading: "RBI Non-Suit Filed Accounts - An Overview",
      body: `Reserve Bank of India had constituted a Committee to recommend data format for furnishing of credit information to Credit Information Companies. The report of the Committee was placed on RBI's website on March 22, 2014.
On the basis of the recommendations made by the Committee and after examining those recommendations, RBI had issued a circular dated June 27, 2014 on Defaulters of ₹ 1 crore and above (non-suit filed accounts) and Wilful Defaulters of ₹ 25 lakhs and above (non-suit filed accounts) – Changes in reporting to Reserve Bank of India (RBI)/Credit Information Companies (CICs), whereby Banks/FIs were advised to furnish data in respect of wilful defaulters (non-suit filed accounts) of ₹ 25 lakhs and above for the quarter ending December 31, 2014 and the data on defaulters (non-suit filed accounts) of ₹ 1 crore and above for the half year ending December 31, 2014 to CICs and not to RBI.
RBI further advised Banks/FIs that they may continue to furnish data in respect of defaulters/wilful defaulters to CICs on a monthly or a more frequent basis. This would enable such information to be available to the banks/FIs on a near real time basis. In the light of the above Circular, TransUnion CIBIL is maintaining the data in respect of wilful defaulters (non-suit filed accounts) of ₹ 25 lakhs & above and defaulters (non-suit filed accounts) of ₹ 1 crore and above for the quarter ending December 31, 2014 onwards.
Banks/FIs sharing information on Non – Suit filed accounts have access to the data. User ID and password is shared with them.
This information is based on an application developed to enable the users to access data through a parameterised search process across banks and companies at various geographical locations.`,
    },
  ],
  hi: [
    {
      heading: "RBI वाद-दायर खाते – एक अवलोकन",
      body: `TransUnion CIBIL Limited (पूर्व नाम: CIBIL) – भारत का पहला क्रेडिट सूचना ब्यूरो – वित्तीय क्षेत्र की क्रेडिट सूचना संबंधी आवश्यकताओं की पूर्ति के लिए स्थापित किया गया है तथा यह गैर-निष्पादित आस्तियों (NPA) की वृद्धि पर अंकुश लगाने के लिए एक प्रभावी तंत्र के रूप में कार्य करता है। भारतीय रिज़र्व बैंक (RBI) ने दिसंबर 2001 में एक कार्य समूह गठित किया, ताकि यह जाँचा जा सके कि बैंकों तथा अधिसूचित वित्तीय संस्थानों (FIs) द्वारा RBI को सूचित किए जाने वाले वाद-दायर खातों और चूककर्ताओं की सूची से संबंधित जानकारी एकत्र करने तथा प्रसारित करने की भूमिका TransUnion CIBIL निभा सकता है अथवा नहीं।
तत्पश्चात RBI ने कार्य समूह की उन अनुशंसाओं को लागू करने का निर्णय लिया, जो उस समय की विद्यमान विधिक व्यवस्था के अनुरूप थीं। अपने पत्र संख्या DL.BC.111/20.16.001/2001-02 दिनांक 4 जून 2002 के माध्यम से RBI ने बैंकों, FIs तथा राज्य वित्तीय निगमों को TransUnion CIBIL के गठन की जानकारी दी और उन्हें निर्देश दिया कि वे निम्नलिखित आँकड़े TransUnion CIBIL तथा RBI, दोनों को भेजें:
- ₹ 1 करोड़ तथा उससे अधिक के वाद-दायर खाते, तथा
- ₹ 25 लाख तथा उससे अधिक के वाद-दायर खाते (जानबूझकर चूक करने वाले)
तदनुसार, बैंकों तथा FIs ने 31 मार्च 2002 की स्थिति के अनुसार ₹ 1 करोड़ तथा उससे अधिक के वाद-दायर खातों की सूची और दिसंबर 2002 तक की तिमाही अद्यतन सूचनाएँ TransUnion CIBIL तथा RBI, दोनों को प्रस्तुत कीं। उन्होंने मार्च, जून, सितंबर तथा दिसंबर 2002 के अंत की स्थिति के अनुसार ₹ 25 लाख तथा उससे अधिक के वाद-दायर खातों (जानबूझकर चूक करने वालों) की सूची भी प्रस्तुत की। इसके पश्चात, 31 मार्च 2003 से यह डेटा केवल TransUnion CIBIL को ही प्रस्तुत किया जा रहा है।
वर्तमान में TransUnion CIBIL ₹ 1 करोड़ तथा उससे अधिक के वाद-दायर खातों और ₹ 25 लाख तथा उससे अधिक के वाद-दायर खातों (जानबूझकर चूक करने वालों) का डेटाबेस रखता है। यह जानकारी एक ऐसे एप्लिकेशन पर आधारित है, जो उपयोगकर्ताओं को विभिन्न भौगोलिक स्थानों पर स्थित बैंकों तथा कंपनियों में मानदंड-आधारित खोज प्रक्रिया के माध्यम से डेटा तक पहुँचने में सक्षम बनाता है। कम मूल्य के वाद-दायर खातों को चरणबद्ध रूप से सम्मिलित किया जा रहा है।`,
    },
    {
      heading: "RBI वाद-रहित खाते – एक अवलोकन",
      body: `भारतीय रिज़र्व बैंक ने क्रेडिट सूचना कंपनियों को क्रेडिट सूचना प्रस्तुत करने हेतु डेटा प्रारूप की अनुशंसा करने के लिए एक समिति गठित की थी। समिति की रिपोर्ट 22 मार्च 2014 को RBI की वेबसाइट पर प्रकाशित की गई।
समिति द्वारा की गई अनुशंसाओं के आधार पर तथा उनकी जाँच के पश्चात, RBI ने 27 जून 2014 को ₹ 1 करोड़ तथा उससे अधिक के चूककर्ताओं (वाद-रहित खाते) और ₹ 25 लाख तथा उससे अधिक के जानबूझकर चूक करने वालों (वाद-रहित खाते) से संबंधित एक परिपत्र जारी किया – भारतीय रिज़र्व बैंक (RBI)/क्रेडिट सूचना कंपनियों (CICs) को की जाने वाली रिपोर्टिंग में परिवर्तन, जिसके अंतर्गत बैंकों/FIs को यह सलाह दी गई कि वे 31 दिसंबर 2014 को समाप्त तिमाही हेतु ₹ 25 लाख तथा उससे अधिक के जानबूझकर चूक करने वालों (वाद-रहित खाते) संबंधी डेटा और 31 दिसंबर 2014 को समाप्त छमाही हेतु ₹ 1 करोड़ तथा उससे अधिक के चूककर्ताओं (वाद-रहित खाते) संबंधी डेटा CICs को प्रस्तुत करें, न कि RBI को।
RBI ने बैंकों/FIs को यह भी सलाह दी कि वे चूककर्ताओं/जानबूझकर चूक करने वालों से संबंधित डेटा CICs को मासिक अथवा उससे अधिक बार प्रस्तुत करना जारी रख सकते हैं। इससे यह जानकारी बैंकों/FIs को लगभग वास्तविक समय पर उपलब्ध हो सकेगी। उपर्युक्त परिपत्र के आलोक में, TransUnion CIBIL 31 दिसंबर 2014 को समाप्त तिमाही से ₹ 25 लाख तथा उससे अधिक के जानबूझकर चूक करने वालों (वाद-रहित खाते) और ₹ 1 करोड़ तथा उससे अधिक के चूककर्ताओं (वाद-रहित खाते) से संबंधित डेटा का रखरखाव कर रहा है।
वाद-रहित खातों की जानकारी साझा करने वाले बैंकों/FIs को इस डेटा तक पहुँच प्राप्त है। उन्हें यूज़र आईडी तथा पासवर्ड उपलब्ध कराया जाता है।
यह जानकारी एक ऐसे एप्लिकेशन पर आधारित है, जो उपयोगकर्ताओं को विभिन्न भौगोलिक स्थानों पर स्थित बैंकों तथा कंपनियों में मानदंड-आधारित खोज प्रक्रिया के माध्यम से डेटा तक पहुँचने में सक्षम बनाता है।`,
    },
  ],
  mr: [
    {
      heading: "RBI दावा दाखल खाती – एक आढावा",
      body: `TransUnion CIBIL Limited (पूर्वीचे नाव: CIBIL) – भारतातील पहिले क्रेडिट माहिती ब्यूरो – वित्तीय क्षेत्राच्या पतमाहितीविषयक गरजा पूर्ण करण्यासाठी स्थापन करण्यात आले असून, अनुत्पादित मालमत्तांच्या (NPA) वाढीस आळा घालण्याकरिता ते एक प्रभावी यंत्रणा म्हणून कार्य करते. बँका व अधिसूचित वित्तीय संस्थांकडून (FIs) RBI ला कळविल्या जाणाऱ्या दावा दाखल खात्यांची आणि थकबाकीदारांच्या यादीची माहिती गोळा करून तिचा प्रसार करण्याची भूमिका TransUnion CIBIL पार पाडू शकते का, याची तपासणी करण्यासाठी भारतीय रिझर्व्ह बँकेने (RBI) डिसेंबर 2001 मध्ये एक कार्यगट स्थापन केला.
त्यानंतर RBI ने कार्यगटाच्या ज्या शिफारशी त्या वेळच्या विद्यमान कायदेशीर चौकटीशी सुसंगत होत्या, त्या अंमलात आणण्याचा निर्णय घेतला. दिनांक 4 जून 2002 रोजीच्या पत्र क्रमांक DL.BC.111/20.16.001/2001-02 द्वारे RBI ने बँका, FIs व राज्य वित्तीय महामंडळांना TransUnion CIBIL च्या स्थापनेची माहिती दिली आणि पुढील माहिती TransUnion CIBIL तसेच RBI या दोघांनाही पाठविण्याचे निर्देश दिले:
- ₹ 1 कोटी व त्याहून अधिक रकमेची दावा दाखल खाती, आणि
- ₹ 25 लाख व त्याहून अधिक रकमेची दावा दाखल खाती (हेतुपुरस्सर थकबाकीदार)
त्यानुसार बँका व FIs यांनी 31 मार्च 2002 रोजीच्या स्थितीनुसार ₹ 1 कोटी व त्याहून अधिक रकमेच्या दावा दाखल खात्यांची यादी आणि डिसेंबर 2002 पर्यंतची तिमाही अद्ययावत माहिती TransUnion CIBIL तसेच RBI यांना सादर केली. तसेच मार्च, जून, सप्टेंबर व डिसेंबर 2002 अखेरच्या स्थितीनुसार ₹ 25 लाख व त्याहून अधिक रकमेच्या दावा दाखल खात्यांची (हेतुपुरस्सर थकबाकीदार) यादीही सादर केली. त्यानंतर 31 मार्च 2003 पासून ही माहिती केवळ TransUnion CIBIL लाच सादर केली जात आहे.
सध्या TransUnion CIBIL हे ₹ 1 कोटी व त्याहून अधिक रकमेच्या दावा दाखल खात्यांचा आणि ₹ 25 लाख व त्याहून अधिक रकमेच्या दावा दाखल खात्यांचा (हेतुपुरस्सर थकबाकीदार) डेटाबेस राखत आहे. ही माहिती अशा एका प्रणालीवर आधारित आहे, जिच्याद्वारे वापरकर्त्यांना विविध भौगोलिक ठिकाणी असलेल्या बँका व कंपन्यांमध्ये मापदंडाधारित शोध प्रक्रियेतून माहिती मिळवता येते. कमी रकमेची दावा दाखल खाती टप्प्याटप्प्याने समाविष्ट केली जात आहेत.`,
    },
    {
      heading: "RBI दावा दाखल न केलेली खाती – एक आढावा",
      body: `क्रेडिट माहिती कंपन्यांना पतमाहिती सादर करण्यासाठीच्या डेटा स्वरूपाची शिफारस करण्याकरिता भारतीय रिझर्व्ह बँकेने एक समिती स्थापन केली होती. या समितीचा अहवाल 22 मार्च 2014 रोजी RBI च्या संकेतस्थळावर प्रसिद्ध करण्यात आला.
समितीने केलेल्या शिफारशींच्या आधारे व त्यांची तपासणी केल्यानंतर, RBI ने 27 जून 2014 रोजी ₹ 1 कोटी व त्याहून अधिक रकमेचे थकबाकीदार (दावा दाखल न केलेली खाती) आणि ₹ 25 लाख व त्याहून अधिक रकमेचे हेतुपुरस्सर थकबाकीदार (दावा दाखल न केलेली खाती) यांच्याबाबत एक परिपत्रक जारी केले – भारतीय रिझर्व्ह बँक (RBI)/क्रेडिट माहिती कंपन्या (CICs) यांना करावयाच्या अहवालातील बदल; त्यानुसार बँका/FIs यांना सूचित करण्यात आले की, 31 डिसेंबर 2014 अखेरच्या तिमाहीसाठी ₹ 25 लाख व त्याहून अधिक रकमेच्या हेतुपुरस्सर थकबाकीदारांची (दावा दाखल न केलेली खाती) माहिती आणि 31 डिसेंबर 2014 अखेरच्या सहामाहीसाठी ₹ 1 कोटी व त्याहून अधिक रकमेच्या थकबाकीदारांची (दावा दाखल न केलेली खाती) माहिती त्यांनी CICs ना सादर करावी, RBI ला नाही.
RBI ने बँका/FIs यांना पुढे असेही सूचित केले की, थकबाकीदार/हेतुपुरस्सर थकबाकीदार यांच्याविषयीची माहिती त्यांनी CICs ना मासिक किंवा त्याहून अधिक वेळा सादर करणे सुरू ठेवावे. यामुळे अशी माहिती बँका/FIs यांना जवळपास तत्काळ उपलब्ध होऊ शकेल. वरील परिपत्रकाच्या अनुषंगाने, TransUnion CIBIL 31 डिसेंबर 2014 अखेरच्या तिमाहीपासून ₹ 25 लाख व त्याहून अधिक रकमेच्या हेतुपुरस्सर थकबाकीदारांची (दावा दाखल न केलेली खाती) आणि ₹ 1 कोटी व त्याहून अधिक रकमेच्या थकबाकीदारांची (दावा दाखल न केलेली खाती) माहिती राखत आहे.
दावा दाखल न केलेल्या खात्यांची माहिती सामायिक करणाऱ्या बँका/FIs यांना या माहितीचा वापर करता येतो. त्यांना वापरकर्ता आयडी व पासवर्ड दिला जातो.
ही माहिती अशा एका प्रणालीवर आधारित आहे, जिच्याद्वारे वापरकर्त्यांना विविध भौगोलिक ठिकाणी असलेल्या बँका व कंपन्यांमध्ये मापदंडाधारित शोध प्रक्रियेतून माहिती मिळवता येते.`,
    },
  ],
  ta: [
    {
      heading: "RBI வழக்குத் தொடரப்பட்ட கணக்குகள் – ஒரு கண்ணோட்டம்",
      body: `TransUnion CIBIL Limited (முன்னர்: CIBIL) – இந்தியாவின் முதல் கடன் தகவல் பணியகம் – நிதித் துறையின் கடன் தகவல் தேவைகளை நிறைவேற்றுவதற்காக நிறுவப்பட்டுள்ளது; வாராக் கடன்களின் (NPA) வளர்ச்சியைக் கட்டுப்படுத்தும் ஒரு பயனுள்ள வழிமுறையாகவும் இது செயல்படுகிறது. வங்கிகளும் அறிவிக்கப்பட்ட நிதி நிறுவனங்களும் (FIs) RBI-க்குத் தெரிவிக்கும் வழக்குத் தொடரப்பட்ட கணக்குகள் மற்றும் தவறியவர்களின் பட்டியல் குறித்த தகவல்களைச் சேகரித்து வெளியிடும் பணியை TransUnion CIBIL மேற்கொள்ள இயலுமா என்பதை ஆராய, இந்திய ரிசர்வ் வங்கி (RBI) டிசம்பர் 2001-இல் ஒரு பணிக்குழுவை அமைத்தது.
அப்போது நடைமுறையில் இருந்த சட்டக் கட்டமைப்பிற்கு உட்பட்ட, பணிக்குழுவின் சில பரிந்துரைகளை அமல்படுத்த RBI முடிவு செய்தது. 4 ஜூன் 2002 தேதியிட்ட கடித எண் DL.BC.111/20.16.001/2001-02 மூலம், TransUnion CIBIL உருவாக்கப்பட்டதை RBI வங்கிகள், FIs மற்றும் மாநில நிதிக் கழகங்களுக்குத் தெரிவித்து, பின்வரும் தரவுகளை TransUnion CIBIL-க்கும் RBI-க்கும் அனுப்புமாறு அறிவுறுத்தியது:
- ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகள், மற்றும்
- ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகள் (வேண்டுமென்றே தவறியவர்கள்)
அதன்படி, 31 மார்ச் 2002 நிலவரப்படி ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகளின் பட்டியலையும், டிசம்பர் 2002 வரையிலான காலாண்டு புதுப்பிப்புகளையும் வங்கிகளும் FIs-ம் TransUnion CIBIL-க்கும் RBI-க்கும் சமர்ப்பித்தன. மார்ச், ஜூன், செப்டம்பர் மற்றும் டிசம்பர் 2002 இறுதி நிலவரப்படி ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகளின் (வேண்டுமென்றே தவறியவர்கள்) பட்டியலையும் அவை சமர்ப்பித்தன. அதன் பிறகு, 31 மார்ச் 2003 முதல் இந்தத் தரவு TransUnion CIBIL-க்கு மட்டுமே சமர்ப்பிக்கப்பட்டு வருகிறது.
தற்போது TransUnion CIBIL, ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகள் மற்றும் ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வழக்குத் தொடரப்பட்ட கணக்குகள் (வேண்டுமென்றே தவறியவர்கள்) குறித்த தரவுத்தளத்தைப் பராமரித்து வருகிறது. பல்வேறு புவியியல் இடங்களில் உள்ள வங்கிகள் மற்றும் நிறுவனங்கள் முழுவதும் அளவுருக்கள் அடிப்படையிலான தேடல் முறையின் மூலம் பயனர்கள் தரவை அணுகும் வகையில் உருவாக்கப்பட்ட ஒரு பயன்பாட்டின் அடிப்படையில் இந்தத் தகவல் அமைந்துள்ளது. குறைந்த மதிப்புள்ள வழக்குத் தொடரப்பட்ட கணக்குகள் கட்டம் கட்டமாகச் சேர்க்கப்பட்டு வருகின்றன.`,
    },
    {
      heading: "RBI வழக்குத் தொடரப்படாத கணக்குகள் – ஒரு கண்ணோட்டம்",
      body: `கடன் தகவல் நிறுவனங்களுக்குக் கடன் தகவலை வழங்குவதற்கான தரவு வடிவத்தைப் பரிந்துரைக்க இந்திய ரிசர்வ் வங்கி ஒரு குழுவை அமைத்திருந்தது. அக்குழுவின் அறிக்கை 22 மார்ச் 2014 அன்று RBI இணையதளத்தில் வெளியிடப்பட்டது.
குழுவின் பரிந்துரைகளின் அடிப்படையிலும், அவற்றை ஆய்வு செய்த பிறகும், ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) மற்றும் ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வேண்டுமென்றே தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) தொடர்பாக – இந்திய ரிசர்வ் வங்கி (RBI)/கடன் தகவல் நிறுவனங்களுக்கு (CICs) அளிக்கப்படும் அறிக்கையிடலில் மாற்றங்கள் என்ற சுற்றறிக்கையை RBI 27 ஜூன் 2014 அன்று வெளியிட்டது. அதன்படி, 31 டிசம்பர் 2014 உடன் முடிவடையும் காலாண்டிற்கான ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வேண்டுமென்றே தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) குறித்த தரவையும், 31 டிசம்பர் 2014 உடன் முடிவடையும் அரையாண்டிற்கான ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) குறித்த தரவையும் RBI-க்கு அல்லாமல் CICs-க்கு வழங்குமாறு வங்கிகள்/FIs அறிவுறுத்தப்பட்டன.
தவறியவர்கள்/வேண்டுமென்றே தவறியவர்கள் குறித்த தரவை மாதந்தோறும் அல்லது அதைவிட அடிக்கடி CICs-க்கு வழங்குவதைத் தொடரலாம் என வங்கிகள்/FIs-க்கு RBI மேலும் அறிவுறுத்தியது. இதன் மூலம் அத்தகைய தகவல் வங்கிகள்/FIs-க்குக் கிட்டத்தட்ட நிகழ்நேரத்தில் கிடைக்கும். மேற்கண்ட சுற்றறிக்கையின் அடிப்படையில், 31 டிசம்பர் 2014 உடன் முடிவடையும் காலாண்டு முதல் ₹ 25 லட்சம் மற்றும் அதற்கு மேற்பட்ட வேண்டுமென்றே தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) மற்றும் ₹ 1 கோடி மற்றும் அதற்கு மேற்பட்ட தவறியவர்கள் (வழக்குத் தொடரப்படாத கணக்குகள்) குறித்த தரவை TransUnion CIBIL பராமரித்து வருகிறது.
வழக்குத் தொடரப்படாத கணக்குகள் குறித்த தகவலைப் பகிரும் வங்கிகள்/FIs இந்தத் தரவை அணுக முடியும். அவர்களுக்குப் பயனர் ஐடி மற்றும் கடவுச்சொல் வழங்கப்படுகிறது.
பல்வேறு புவியியல் இடங்களில் உள்ள வங்கிகள் மற்றும் நிறுவனங்கள் முழுவதும் அளவுருக்கள் அடிப்படையிலான தேடல் முறையின் மூலம் பயனர்கள் தரவை அணுகும் வகையில் உருவாக்கப்பட்ட ஒரு பயன்பாட்டின் அடிப்படையில் இந்தத் தகவல் அமைந்துள்ளது.`,
    },
  ],
};

export interface RbiCircular {
  sr: number;
  category: string;
  name: string;
  reference: string;
  date: string;
}

export const RBI_CIRCULARS: Record<Language, RbiCircular[]> = {
  en: [
    { sr: 1, category: "Core", name: "Reserve Bank of India (Credit Information Companies) Directions, 2025", reference: "RBI/DOR/2025-26/378", date: "28-Nov-2025" },
    { sr: 2, category: "Amendment", name: "Reserve Bank of India (Credit Information Companies) Amendment Directions, 2025", reference: "RBI/DOR/2025-26/119", date: "04-Dec-2025" },
    { sr: 3, category: "Customer", name: "Reserve Bank of India (Credit Information Companies – Internal Ombudsman) Directions, 2026", reference: "RBI/CEPD/2025-26/386", date: "14-Jan-2026" },
    { sr: 4, category: "Customer", name: "Reserve Bank – Integrated Ombudsman Scheme (RB-IOS), 2026", reference: "Press Release 2025-26/1936", date: "14-Jan-2026" },
    { sr: 5, category: "Defaulter", name: "Reserve Bank of India (Commercial Banks – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/166", date: "28-Nov-2025" },
    { sr: 6, category: "Defaulter", name: "Reserve Bank of India (Non-Banking Financial Companies – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/358", date: "28-Nov-2025" },
    { sr: 7, category: "Defaulter", name: "Reserve Bank of India (All India Financial Institutions – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/333", date: "28-Nov-2025" },
    { sr: 8, category: "Operational", name: "Frequency of reporting of credit information by Credit Institutions to Credit Information Companies", reference: "RBI/2024-25/60", date: "08-Aug-2024" },
    { sr: 9, category: "Operational", name: "Implementation of Credit Information Reporting Mechanism subsequent to cancellation of licence or Certificate of Registration", reference: "RBI/2024-25/81", date: "10-Oct-2024" },
  ],
  hi: [
    { sr: 1, category: "मूल", name: "भारतीय रिज़र्व बैंक (क्रेडिट सूचना कंपनियाँ) निदेश, 2025", reference: "RBI/DOR/2025-26/378", date: "28-नव-2025" },
    { sr: 2, category: "संशोधन", name: "भारतीय रिज़र्व बैंक (क्रेडिट सूचना कंपनियाँ) संशोधन निदेश, 2025", reference: "RBI/DOR/2025-26/119", date: "04-दिस-2025" },
    { sr: 3, category: "ग्राहक", name: "भारतीय रिज़र्व बैंक (क्रेडिट सूचना कंपनियाँ – आंतरिक लोकपाल) निदेश, 2026", reference: "RBI/CEPD/2025-26/386", date: "14-जन-2026" },
    { sr: 4, category: "ग्राहक", name: "रिज़र्व बैंक – एकीकृत लोकपाल योजना (RB-IOS), 2026", reference: "Press Release 2025-26/1936", date: "14-जन-2026" },
    { sr: 5, category: "चूककर्ता", name: "भारतीय रिज़र्व बैंक (वाणिज्यिक बैंक – जानबूझकर चूक करने वालों तथा बड़े चूककर्ताओं से संबंधित कार्रवाई) निदेश, 2025", reference: "RBI/DOR/2025-26/166", date: "28-नव-2025" },
    { sr: 6, category: "चूककर्ता", name: "भारतीय रिज़र्व बैंक (गैर-बैंकिंग वित्तीय कंपनियाँ – जानबूझकर चूक करने वालों तथा बड़े चूककर्ताओं से संबंधित कार्रवाई) निदेश, 2025", reference: "RBI/DOR/2025-26/358", date: "28-नव-2025" },
    { sr: 7, category: "चूककर्ता", name: "भारतीय रिज़र्व बैंक (अखिल भारतीय वित्तीय संस्थान – जानबूझकर चूक करने वालों तथा बड़े चूककर्ताओं से संबंधित कार्रवाई) निदेश, 2025", reference: "RBI/DOR/2025-26/333", date: "28-नव-2025" },
    { sr: 8, category: "परिचालन", name: "क्रेडिट संस्थानों द्वारा क्रेडिट सूचना कंपनियों को क्रेडिट सूचना की रिपोर्टिंग की आवृत्ति", reference: "RBI/2024-25/60", date: "08-अग-2024" },
    { sr: 9, category: "परिचालन", name: "लाइसेंस अथवा पंजीकरण प्रमाणपत्र रद्द होने के पश्चात क्रेडिट सूचना रिपोर्टिंग तंत्र का कार्यान्वयन", reference: "RBI/2024-25/81", date: "10-अक्टू-2024" },
  ],
  mr: [
    { sr: 1, category: "मूलभूत", name: "भारतीय रिझर्व्ह बँक (क्रेडिट माहिती कंपन्या) निर्देश, 2025", reference: "RBI/DOR/2025-26/378", date: "28-नोव्हें-2025" },
    { sr: 2, category: "सुधारणा", name: "भारतीय रिझर्व्ह बँक (क्रेडिट माहिती कंपन्या) सुधारणा निर्देश, 2025", reference: "RBI/DOR/2025-26/119", date: "04-डिसें-2025" },
    { sr: 3, category: "ग्राहक", name: "भारतीय रिझर्व्ह बँक (क्रेडिट माहिती कंपन्या – अंतर्गत लोकपाल) निर्देश, 2026", reference: "RBI/CEPD/2025-26/386", date: "14-जाने-2026" },
    { sr: 4, category: "ग्राहक", name: "रिझर्व्ह बँक – एकात्मिक लोकपाल योजना (RB-IOS), 2026", reference: "Press Release 2025-26/1936", date: "14-जाने-2026" },
    { sr: 5, category: "थकबाकीदार", name: "भारतीय रिझर्व्ह बँक (व्यावसायिक बँका – हेतुपुरस्सर थकबाकीदार व मोठ्या थकबाकीदारांबाबतची कार्यवाही) निर्देश, 2025", reference: "RBI/DOR/2025-26/166", date: "28-नोव्हें-2025" },
    { sr: 6, category: "थकबाकीदार", name: "भारतीय रिझर्व्ह बँक (बिगर-बँकिंग वित्तीय कंपन्या – हेतुपुरस्सर थकबाकीदार व मोठ्या थकबाकीदारांबाबतची कार्यवाही) निर्देश, 2025", reference: "RBI/DOR/2025-26/358", date: "28-नोव्हें-2025" },
    { sr: 7, category: "थकबाकीदार", name: "भारतीय रिझर्व्ह बँक (अखिल भारतीय वित्तीय संस्था – हेतुपुरस्सर थकबाकीदार व मोठ्या थकबाकीदारांबाबतची कार्यवाही) निर्देश, 2025", reference: "RBI/DOR/2025-26/333", date: "28-नोव्हें-2025" },
    { sr: 8, category: "कार्यचालन", name: "पतसंस्थांकडून क्रेडिट माहिती कंपन्यांना पतमाहिती कळविण्याची वारंवारता", reference: "RBI/2024-25/60", date: "08-ऑग-2024" },
    { sr: 9, category: "कार्यचालन", name: "परवाना अथवा नोंदणी प्रमाणपत्र रद्द झाल्यानंतर पतमाहिती अहवाल यंत्रणेची अंमलबजावणी", reference: "RBI/2024-25/81", date: "10-ऑक्टो-2024" },
  ],
  ta: [
    { sr: 1, category: "அடிப்படை", name: "இந்திய ரிசர்வ் வங்கி (கடன் தகவல் நிறுவனங்கள்) அறிவுறுத்தல்கள், 2025", reference: "RBI/DOR/2025-26/378", date: "28-நவ-2025" },
    { sr: 2, category: "திருத்தம்", name: "இந்திய ரிசர்வ் வங்கி (கடன் தகவல் நிறுவனங்கள்) திருத்த அறிவுறுத்தல்கள், 2025", reference: "RBI/DOR/2025-26/119", date: "04-டிச-2025" },
    { sr: 3, category: "வாடிக்கையாளர்", name: "இந்திய ரிசர்வ் வங்கி (கடன் தகவல் நிறுவனங்கள் – உள் குறைதீர்ப்பாளர்) அறிவுறுத்தல்கள், 2026", reference: "RBI/CEPD/2025-26/386", date: "14-ஜன-2026" },
    { sr: 4, category: "வாடிக்கையாளர்", name: "ரிசர்வ் வங்கி – ஒருங்கிணைந்த குறைதீர்ப்பாளர் திட்டம் (RB-IOS), 2026", reference: "Press Release 2025-26/1936", date: "14-ஜன-2026" },
    { sr: 5, category: "தவறியவர்", name: "இந்திய ரிசர்வ் வங்கி (வணிக வங்கிகள் – வேண்டுமென்றே தவறியவர்கள் மற்றும் பெரும் தவறியவர்களைக் கையாளுதல்) அறிவுறுத்தல்கள், 2025", reference: "RBI/DOR/2025-26/166", date: "28-நவ-2025" },
    { sr: 6, category: "தவறியவர்", name: "இந்திய ரிசர்வ் வங்கி (வங்கி சாரா நிதி நிறுவனங்கள் – வேண்டுமென்றே தவறியவர்கள் மற்றும் பெரும் தவறியவர்களைக் கையாளுதல்) அறிவுறுத்தல்கள், 2025", reference: "RBI/DOR/2025-26/358", date: "28-நவ-2025" },
    { sr: 7, category: "தவறியவர்", name: "இந்திய ரிசர்வ் வங்கி (அகில இந்திய நிதி நிறுவனங்கள் – வேண்டுமென்றே தவறியவர்கள் மற்றும் பெரும் தவறியவர்களைக் கையாளுதல்) அறிவுறுத்தல்கள், 2025", reference: "RBI/DOR/2025-26/333", date: "28-நவ-2025" },
    { sr: 8, category: "செயல்பாட்டு", name: "கடன் நிறுவனங்களால் கடன் தகவல் நிறுவனங்களுக்குக் கடன் தகவல் அறிக்கையிடப்படும் அதிர்வெண்", reference: "RBI/2024-25/60", date: "08-ஆக-2024" },
    { sr: 9, category: "செயல்பாட்டு", name: "உரிமம் அல்லது பதிவுச் சான்றிதழ் ரத்து செய்யப்பட்ட பிறகு கடன் தகவல் அறிக்கையிடல் வழிமுறையை அமல்படுத்துதல்", reference: "RBI/2024-25/81", date: "10-அக்-2024" },
  ],
};
