import type { v3en } from "./en";

/** Hindi. Brand names (CIBIL, TransUnion, RBI) stay in Latin script; everything else is translated. */
export const v3hi: Record<keyof typeof v3en, string> = {
  v3SkipToContent: "मुख्य सामग्री पर जाएँ",
  v3MainNavLabel: "मुख्य नेविगेशन",
  v3BreadcrumbLabel: "ब्रेडक्रम्ब",
  v3SectionNavLabel: "अनुभाग नेविगेशन",
  v3ReadingProgress: "पढ़ने की प्रगति",
  v3LanguageLabel: "भाषा",
  v3BackToTop: "ऊपर जाएँ",
  v3ViewClassicSite: "क्लासिक साइट देखें",
  v3SearchHint: "हर पृष्ठ में खोजें",
  v3CloseLabel: "बंद करें",
  v3ChatUnavailable: "इस डेमो में चैट उपलब्ध नहीं है।",

  v3IndexLabel: "अनुक्रमणिका",
  v3IndexLede: "CIBIL का हर अनुभाग, पूरी सूची में।",
  v3OpenIndex: "अनुक्रमणिका खोलें",
  v3CloseIndex: "अनुक्रमणिका बंद करें",

  v3Included: "शामिल है",
  v3NotIncluded: "शामिल नहीं है",

  v3Plan: "योजना",
  v3Price: "मूल्य",
  v3Term: "अवधि",

  v3ScrollHint: "आगे पढ़ें",
  v3Contents: "विषय-सूची",
  v3InThisSection: "इस अनुभाग में",
  v3RelatedPages: "संबंधित पृष्ठ",
  v3AllPages: "सभी पृष्ठ",
  v3Explore: "देखें",
  v3Previous: "पिछला",
  v3Next: "अगला",
  v3FiltersLabel: "फ़िल्टर",
  v3ExpandAll: "सब खोलें",
  v3CollapseAll: "सब बंद करें",

  v3AtAGlance: "एक नज़र में",
  v3KeyPoints: "मुख्य बिंदु",
  v3ProcessLabel: "प्रक्रिया",
  v3DetailsLabel: "विवरण",
  v3StatsKicker: "आँकड़ों में",
  v3Step: "चरण",
  v3FigureLabel: "चित्र",

  v3HeroKicker: "भारत की क्रेडिट सूचना अग्रणी संस्था",
  v3CtaKicker: "शुरू करें",
  v3CtaHeadline: "आपकी क्रेडिट कहानी यहीं से शुरू होती है",
  v3CtaBody: "अपना CIBIL खाता बनाएँ और वही स्कोर देखें जो ऋणदाता देखते हैं।",

  v3SitemapLede: "इस अनुभव का हर पृष्ठ, एक ही जगह पर।",

  v3NotFoundTitle: "पृष्ठ नहीं मिला",
  v3NotFoundBody:
    "आप जिस पृष्ठ को खोज रहे हैं वह हट चुका है या मौजूद नहीं है। अनुक्रमणिका देखें, या होम पर लौटें।",
  v3GoHome: "होमपेज पर जाएँ",
  v3ErrorTitle: "कुछ गड़बड़ हो गई",
  v3ErrorBody: "यह पृष्ठ लोड करते समय एक अप्रत्याशित त्रुटि हुई।",
  v3Retry: "फिर से कोशिश करें",
};
