/**
 * Blog card titles for the Knowledge Center listing pages, transcribed from the source site.
 * These are article-title CONTENT (not UI chrome), so they live here as plain English data
 * rather than in the i18n system — translating ~85 marketing headlines × 4 languages would be
 * disproportionate. The surrounding page chrome (hero, "Topics", "BLOG", banners) is fully i18n'd.
 *
 * A card is either a bare title, or a title plus its teaser image. Cards without an image fall
 * back to a gradient tile in BlogGrid.
 */
export type BlogCard = string | { title: string; image: string };

const TEASER = "https://www.cibil.com/blog";

export const CREDIT_ADVICE_CARDS: BlogCard[] = [
  {
    title: "Building a Strong Financial Foundation Essential Money Skills for Young Indians",
    image: `${TEASER}/building-a-strong-financial-foundation-essential-money-skills-for-young-indians/_jcr_content/teaserImage.coreimg.75.1440.png/1699254127999/money-skills.png`,
  },
  {
    title: "Set Yourself Up in Your 20s for Financial Stability in Your 40s",
    image: `${TEASER}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/_jcr_content/teaserImage.coreimg.75.1440.png/1690797885030/stability-in-your-fourties-.png`,
  },
  {
    title: "Your One-stop Holiday Shopping Credit Guide",
    image: `${TEASER}/your-one-stop-holiday-shopping-credit-guide/_jcr_content/teaserImage.coreimg.75.1440.png/1685047513600/holiday-season.png`,
  },
  {
    title: "CIBIL Alerts: A Smarter, Safer Way to Protect Your Financial Identity",
    image: `${TEASER}/cibil-alerts-a-smarter-safer-way-to-protect-your-financial-identity/_jcr_content/teaserImage.coreimg.75.1440.png/1693462150678/cibil-alerts.png`,
  },
  {
    title: "Here's How Creditworthiness Accelerates Your Financial Independence",
    image: `${TEASER}/heres-how-creditworthiness-accelerates-your-financial-independence/_jcr_content/teaserImage.coreimg.75.1440.png/1685048219550/creditworthiness-accelerates.png`,
  },
  {
    title: "How a Strong CIBIL Score Can Help Home Loan Borrowers",
    image: `${TEASER}/how-a-strong-cibil-score-can-help-home-loan-borrowers/_jcr_content/teaserImage.coreimg.75.1440.png/1685048825966/homeloan.png`,
  },
  {
    title: "Some of the Common Credit Mistakes to Avoid",
    image: `${TEASER}/some-of-the-common-credit-mistakes-to-avoid/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834667/top-credit-mistakes.png`,
  },
  {
    title: "Safeguarding your Credit Profile",
    image: `${TEASER}/safeguarding-your-credit-profile/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208834621/safeguard.jpeg`,
  },
  {
    title: "How Women's Credit Choices are affecting the Indian Economic Ecosystem",
    image: `${TEASER}/how-womens-credit-choices-are-affecting-he-indian-economic-ecosystem/_jcr_content/teaserImage.coreimg.75.1440.png/1671208810929/iwd-banner.png`,
  },
  {
    title: "Move Towards Financial Freedom With These Three Steps",
    image: `${TEASER}/move-towards-financial-freedom-with-three-steps/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208484923/financial-freedom.jpeg`,
  },
  {
    title: "Build A Positive Credit Profile With Good Credit Habits",
    image: `${TEASER}/build-a-positive-credit-profile-with-good-credit-habits/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802681/build-positive-profile.jpeg`,
  },
  {
    title: "The Advantages Of A Positive Credit Profile And High CIBIL Score",
    image: `${TEASER}/the-advantages-of-a-positive-credit-profile-and-high-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.png/1671208803457/advantagesofhighcibil.png`,
  },
  {
    title: "All You Need To Know About Your CIBIL Score And How It Is Calculated",
    image: `${TEASER}/all-you-need-to-know-about-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802791/calculate.jpeg`,
  },
  {
    title: "Tackle a Financial Hardship with Calm and Credit consciousness",
    image: `${TEASER}/tackle-financial-hardship-with-calm-and-credit-consciousness/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802923/financial-hardships.jpeg`,
  },
  {
    title: "Know The Difference Between Your CIBIL Score and Report",
    image: `${TEASER}/cibil-score-vs-report/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208810987/score-vs-report.jpeg`,
  },
  {
    title: "How To Create Your Financial And Credit Roadmap",
    image: `${TEASER}/how-to-create-your-financial-and-credit-roadmap/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803156/credit-roadmap.jpeg`,
  },
  {
    title: "Credit habits of Indian Millennials",
    image: `${TEASER}/credit-habits-of-indian-millennial/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208908849/millenialstudybanner.jpeg`,
  },
  {
    title: "Here's How Your Gold Ornaments Can Help You Get Access To Credit",
    image: `${TEASER}/how-your-gold-ornaments-can-help-you-get-access-to-credit/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802823/goldloanblog.jpeg`,
  },
  {
    title: "How does your CIBIL Score affect your car loan?",
    image: `${TEASER}/how-does-your-cibil-score-affect-your-car-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802965/carloan.jpeg`,
  },
  {
    title: "Taking Informed Credit Decisions Just Got Easier With The Score Simulator",
    image: `${TEASER}/taking-informed-credit-decisions-just-got-easier-with-the-score-simulator/_jcr_content/teaserImage.coreimg.75.1440.png/1671208810652/simulatorblogbanner.png`,
  },
  {
    title: "Cycle Of Good Credit",
    image: `${TEASER}/cycle-of-good-credit/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208484875/cycle-of-credit.jpeg`,
  },
  {
    title: "Is There A Difference Between CIBIL Rank and CIBIL Score?",
    image: `${TEASER}/is-there-a-difference-between-cibilrank-and-cibilscore/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208514057/rank-vs-score-banner.jpeg`,
  },
  {
    title: "7 Steps Towards Maintaining A Healthy CIBIL Score",
    image: `${TEASER}/7-steps-towards-maintaining-healthy-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803210/7steps.jpeg`,
  },
  {
    title: "8 Steps to Protect Yourself from Credit Fraud and Identity Theft",
    image: `${TEASER}/four-steps-to-protect-yourself-from-credit-fraud/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208495100/id-fraud-blog.jpeg`,
  },
  {
    title: "5 Things Every Parent Should Know While Applying for An Education Loan",
    image: `${TEASER}/five-things-every-parent-should-know-while-applying-for-education-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802725/education-loan-advice.jpeg`,
  },
  {
    title: "Four Things To Consider When Applying For A Travel Loan",
    image: `${TEASER}/four-things-to-consider-when-applying-for-a-travel-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208514100/travel-article.jpeg`,
  },
  {
    title: "Six Ways You Can Use Your Credit Card For An Optimum Credit Score",
    image: `${TEASER}/six-ways-you-can-use-credit-card-for-optimum-credit-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208485030/credit-tips.jpeg`,
  },
  "Millennials Guide for Building A Healthy Credit Profile",
  "Does a Failed Credit Card Payment Pull Down Your CIBIL Score?",
  "Achieve Your Dreams This Festive Season Through Responsible Credit Use",
  "Decoding Gold Loan: Understanding the Credit Value of Gold",
  "Credit Matters, at Every Important Stage in Your Life",
  "Seven Money-Management Lessons for Women",
  "A smart borrowing strategy for long-term financial health",
  "Be the Boss Of Your Own Money",
  "The Power of Good Credit Habits",
  "Your Checklist for a Credit-Positive Start to the New Financial Year",
  "Love, Marriage, and CIBIL Scores: Why Your Financial Health Matters",
  "What is a CIBIL Score ?",
  "CIBIL Quest: The Path to Creditworthiness",
  "Game On: Level Up Your Fraud Defense with Data Encryption",
  "Click, Check, Control: Check Your Free CIBIL Score Once a Calendar Year",
  "Credit Marathon: How to Train Your Way to a Strong Credit History",
  "Closing a Credit Card? Here's Your Do's and Don'ts Checklist",
  "Before You Drive Off - Key Checks Prior to Applying for a Car Loan",
  "When the Rates Slow You Down, Let Your Finances Catch Up",
  "Celebrate more, Worry Less: Smarter Spending This Festive Season",
  "From Cart to Credit Shopping Wisely Online and Offline",
  "The Golden Touch: How Rising Prices Impact Your Festive & Family Plans",
  "Festive Season Finance: Gold Loans, Personal Loans and Your CIBIL Score",
  "Vacation on Your Mind? Credit by Your Side!",
  "Financing Forever: Credit Choices Before and After the Wedding",
  "Swipe Smart: How your mind shapes your credit habits",
  "Stay Merry This Festive Season: Keep Your CIBIL Score Sparkling!",
  "Your Credit Health Cheat Sheet: How to Stick to Your Financial New Year Resolutions",
  "Credit Mix Made Simple: Why the Right Balance Matters for Your Credit Health",
  'Web-Through: Reading "Accounts" & "Enquiries" Sections in Your CIBIL Report',
  "Why Your CIBIL Score Matters Beyond Loan Approvals",
  "Credit Setup: How to Build a Habit Stacked Credit Routine That Actually Sticks",
  "New Credit Card? Your Storybook of Healthy Credit Habits Begins Here",
  "Holiday Season Without the after-effects: Think of Your Credit Card Like Your Vacation Buddy",
  "Optimizing Credit Is Expanding Credit: Why Discipline Matters",
];

export const CREDIT_MYTHS_CARDS: BlogCard[] = [
  {
    title: "Can You Bounce Back From A Low CIBIL Score?",
    image: `${TEASER}/can-you-bounce-back-from-a-low-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208802879/bounce-from-low-cibil-myths.jpeg`,
  },
  {
    title: 'Impact Of "Settled" Status On Your CIBIL Score',
    image: `${TEASER}/impact-of-settled-status-on-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208539815/settledstatus.jpeg`,
  },
];

export const WATCH_LEARN_CARDS: BlogCard[] = [
  {
    title: "Understanding the key features of your CIBIL Report",
    image: `${TEASER}/understand-the-key-features-of-your-cibil-report/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1729610114846/new-cibil-score-new.jpeg`,
  },
  {
    title: "Credit-Readiness Begins With Good Credit Habits",
    image: `${TEASER}/how-to-be-credit-ready-with-good-credit-habits/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208490141/goodcredithabit.jpeg`,
  },
  {
    title: "How To Shop Without Worrying About Any Impact To Your CIBIL Score",
    image: `${TEASER}/how-to-shop-without-worrying-about-any-impact-to-your-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208490218/how-to-shop-without-worrying-about-cibil.jpeg`,
  },
  {
    title: "Top 5 Tips To Boost Your Credit Health",
    image: `${TEASER}/top-5-tips-to-boost-your-credit-health/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208810690/top-5-tips-to-boost-your-credit-health.jpeg`,
  },
];

/** Hero band artwork for the Commercial Credit listing page. */
export const COMMERCIAL_CREDIT_HERO =
  "https://www.cibil.com/content/dam/cibil/blog/commercialcredit.jpeg";

export const COMMERCIAL_CREDIT_CARDS: BlogCard[] = [
  {
    title: "10 Ways to Manage your Business Finances Effectively",
    image: `${TEASER}/ten-ways-to-manage-your-business-finances-effectively/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1671208803500/10ways.jpeg`,
  },
  {
    title: "Fast Track Your Business Plans With CIBIL Rank",
    image: `${TEASER}/fast-track-your-business-plans-with-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1761539431514/commercialrank.jpeg`,
  },
  {
    title: "Unlocking potential with CIBIL rank & Company Credit Report",
    image: `${TEASER}/unlocking-potential-with-cibil-rank-and-company-credit-report/_jcr_content/teaserImage.coreimg.75.1440.png/1722229713093/potentialwithcibilrank.png`,
  },
  {
    title: "How to Supercharge Business Loan Eligibility",
    image: `${TEASER}/how-to-supercharge-business-loan-eligibility/_jcr_content/teaserImage.coreimg.75.1440.png/1722229710083/superchargebussinessloan.png`,
  },
  {
    title: "Good Credit Habits for a business, for a Strong CIBIL Rank",
    image: `${TEASER}/good-credit-habits-for-a-business-for-a-strong-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.png/1722229709828/goodcredithabitsbussiness.png`,
  },
  {
    title: "6 Money-Management Tips For Budding Entrepreneurs",
    image: `${TEASER}/six-money-management-tips-for-budding-entrepreneurs/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468338/tips-on-starting-a-new-business.png`,
  },
  {
    title: "How Financial Self-Reliance Can Improve Your Quality of Life",
    image: `${TEASER}/how-financial-self-reliance-can-improve-your-quality-of-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468084/upscaling-your-life.png`,
  },
  {
    title: "From Cash Flow to Creditworthiness: How Small Businesses Can Improve Loan Eligibility",
    image: `${TEASER}/how-small-businesses-can-improve-loan-eligibility/_jcr_content/teaserImage.coreimg.75.1440.png/1747990208312/cash-flow-to-creditworthiness.png`,
  },
  {
    title: "Your Guide To Securing A Business Loan",
    image: `${TEASER}/guide-to-securing-business-loan/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1742187624937/business-loan.jpeg`,
  },
  {
    title: "Business Success That is Built on the Pillars of Financial Discipline",
    image: `${TEASER}/business-success-that-is-built-on-the-pillars-of-financial-discipline/_jcr_content/teaserImage.coreimg.75.1440.png/1758780197212/business-financial-discipline.png`,
  },
  {
    title: "Common Credit Mistakes Entrepreneurs Make and How to Avoid Them",
    image: `${TEASER}/common-credit-mistakes-entrepreneurs-make-and-how-to-avoid-them/_jcr_content/teaserImage.coreimg.75.1440.png/1776251374024/common-credit-mistakes.png`,
  },
  {
    title: "A Simple Guide to Understanding your Company's Credit Health",
    image: `${TEASER}/a-simple-guide-to-understanding-your-companys-credit-health/_jcr_content/teaserImage.coreimg.75.1440.png/1779356496301/blog3-company-s-credit-health.png`,
  },
  {
    title: "What is CIBIL RANK and COMPANY CREDIT REPORT (CCR)?",
    image: `${TEASER}/what-is-cibil-rank-and-company-credit-report-ccr/_jcr_content/teaserImage.coreimg.75.1440.png/1779364217365/blog-4-cibil-rank-and-company-credit-report--ccr-.png`,
  },
  {
    title: "How Lenders Evaluate Your Company Credit Report Before Approving Loans",
    image: `${TEASER}/how-lenders-evaluate-your-company-credit-report-before-approving-loans/_jcr_content/teaserImage.coreimg.75.1440.png/1779439097329/blog-5-how-lenders-evaluate.png`,
  },
  {
    title: "From Transactions to Trust: How Your Business Activity Shapes Your CIBIL Rank",
    image: `${TEASER}/from-transactions-to-trust-how-your-business-activity-shapes-your-cibil-rank/_jcr_content/teaserImage.coreimg.75.1440.png/1781169183290/blog2-from-transactions-to-trust.png`,
  },
];

/** Hero band artwork for the New To Credit listing page. */
export const NEW_TO_CREDIT_HERO =
  "https://www.cibil.com/content/dam/cibil/consumer/credit-advice.jpg";

export const NEW_TO_CREDIT_CARDS: BlogCard[] = [
  {
    title: "What is a CIBIL Score ?",
    image: `${TEASER}/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg`,
  },
  {
    title: "New-to-credit? Here's how to maintain a healthy CIBIL score",
    image: `${TEASER}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.png/1699255129917/ntc-credit.png`,
  },
  {
    title: "Five Easy to Meet Credit Resolutions for the New Year",
    image: `${TEASER}/five-easy-to-meet-credit-resolutions-for-the-new-year/_jcr_content/teaserImage.coreimg.75.1440.png/1685047513410/new-year.png`,
  },
  {
    title: "First-time users guide to establishing credit",
    image: `${TEASER}/first-time-users-guide-to-establishing-credit-infographic/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png`,
  },
];
