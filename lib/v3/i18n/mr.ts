import type { v3en } from "./en";

/** Marathi. Brand names (CIBIL, TransUnion, RBI) stay in Latin script; everything else is translated. */
export const v3mr: Record<keyof typeof v3en, string> = {
  v3SkipToContent: "मुख्य मजकुराकडे जा",
  v3MainNavLabel: "मुख्य नेव्हिगेशन",
  v3BreadcrumbLabel: "ब्रेडक्रंब",
  v3SectionNavLabel: "विभाग नेव्हिगेशन",
  v3ReadingProgress: "वाचनाची प्रगती",
  v3LanguageLabel: "भाषा",
  v3BackToTop: "वर जा",
  v3ViewClassicSite: "क्लासिक साइट पाहा",
  v3SearchHint: "प्रत्येक पानात शोधा",
  v3CloseLabel: "बंद करा",
  v3ChatUnavailable: "या डेमोमध्ये चॅट उपलब्ध नाही.",

  v3IndexLabel: "अनुक्रमणिका",
  v3IndexLede: "CIBIL चा प्रत्येक विभाग, संपूर्ण यादीत.",
  v3OpenIndex: "अनुक्रमणिका उघडा",
  v3CloseIndex: "अनुक्रमणिका बंद करा",

  v3Included: "समाविष्ट आहे",
  v3NotIncluded: "समाविष्ट नाही",

  v3Plan: "योजना",
  v3Price: "किंमत",
  v3Term: "कालावधी",

  v3ScrollHint: "पुढे वाचा",
  v3Contents: "अनुक्रम",
  v3InThisSection: "या विभागात",
  v3RelatedPages: "संबंधित पाने",
  v3AllPages: "सर्व पाने",
  v3Explore: "पाहा",
  v3Previous: "मागील",
  v3Next: "पुढील",
  v3FiltersLabel: "फिल्टर",
  v3ExpandAll: "सर्व उघडा",
  v3CollapseAll: "सर्व बंद करा",

  v3AtAGlance: "एका दृष्टिक्षेपात",
  v3KeyPoints: "महत्त्वाचे मुद्दे",
  v3ProcessLabel: "प्रक्रिया",
  v3DetailsLabel: "तपशील",
  v3StatsKicker: "आकडेवारीत",
  v3Step: "पायरी",
  v3FigureLabel: "आकृती",

  v3HeroKicker: "भारताची क्रेडिट माहिती क्षेत्रातील अग्रणी संस्था",
  v3CtaKicker: "सुरुवात करा",
  v3CtaHeadline: "तुमची क्रेडिट कहाणी इथून सुरू होते",
  v3CtaBody: "तुमचे CIBIL खाते तयार करा आणि कर्जदाते पाहतात तोच स्कोअर पाहा.",

  v3SitemapLede: "या अनुभवाचे प्रत्येक पान, एकाच ठिकाणी.",

  v3NotFoundTitle: "पान सापडले नाही",
  v3NotFoundBody:
    "तुम्ही शोधत असलेले पान हलवले आहे किंवा अस्तित्वात नाही. अनुक्रमणिका पाहा, किंवा मुख्यपृष्ठावर परत जा.",
  v3GoHome: "मुख्यपृष्ठावर जा",
  v3ErrorTitle: "काहीतरी चूक झाली",
  v3ErrorBody: "हे पान लोड करताना अनपेक्षित त्रुटी आली.",
  v3Retry: "पुन्हा प्रयत्न करा",
};
