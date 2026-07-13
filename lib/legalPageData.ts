/**
 * Content for the legal pages, transcribed from the source site.
 *
 * Like `lib/footerPageData.ts`, this is long-form document copy rather than UI chrome, so it lives
 * here as plain English data instead of being split across the four locale files. Legal text is
 * binding and must not be machine-translated; the page chrome around it (title, intro, table of
 * contents heading) *is* i18n'd. To refresh the document, replace the strings below — the page and
 * its table of contents are generated from this array, so no component changes are needed.
 *
 * `body` strings support the inline markup understood by `lib/richText.tsx`:
 *   `**bold**`, `[label](/href)`, and lines starting with `- ` become bullets.
 */

export interface TermsSubsection {
  heading: string;
  body: string;
}

export interface TermsSection {
  /** Slug for the in-page anchor and the table-of-contents link. */
  id: string;
  heading: string;
  body?: string;
  subsections?: TermsSubsection[];
}

/** Lead-in paragraphs shown above the first numbered section. */
export const TERMS_INTRO: string[] = [
  'This document lays out the terms and conditions and rules, as may be amended and supplemented from time to time ("Terms"), that are applicable to the Products and Services (as defined below) provided by TransUnion CIBIL Limited ("TransUnion CIBIL") to you ("you", "your", "I", "we" or "us"). These Terms shall be applicable to the provision of: (i) Credit Information Reports (Individual CIRs) and Company Credit Information Report (Company CIRs) (collectively referred to as Reports) to either an individual consumer or a company, as applicable, (ii) any other products and services, whether related or ancillary to the Reports, and (iii) any other products and services rendered by TransUnion CIBIL to the persons (collectively referred to as the "Products and Services").',
  'By accessing, registering for, purchasing or otherwise using any of the Products and Services, you confirm that you have read, understood and agreed to be bound by these Terms and the Privacy Policy. If you do not agree with these Terms, please do not proceed with the Transaction.',
  'The words "I", "me", "us", "my", "our", "myself", "customer" and "consumer" refer to the Person(s) who request for their respective Reports or receive the Products and Services or purchase the Transaction (as defined hereinabove) or part thereof (Consumer) and shall include both singular and plural. Reference to the masculine gender shall include the feminine and neutral gender or any other legal entity.',
  'I acknowledge and expressly agree with the following terms and conditions:',
];

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "general",
    heading: "General",
    body: `I/We have read, understood and agree to abide by these Terms (including any changes thereto made by TransUnion CIBIL at its sole discretion, from time to time, relating to the Transaction with TransUnion CIBIL), which changes shall be made available on TransUnion CIBIL's website (www.cibil.com and www.transunioncibil.com) in the agreed form that forms a valid contract between myself/ourselves and TransUnion CIBIL, and that TransUnion CIBIL may, at its sole discretion, amend the Products and Services relating to the Transaction and/or the Terms, either wholly or partially, at any time in the manner stated above and without the requirement of any prior notice or consent.

I/We agree that these Terms constitute the entire agreement between myself/ourselves and TransUnion CIBIL with respect to the Transaction and these Terms supersede all prior or contemporaneous communications and proposals, if any, whether electronic, oral, or written, between me/us and TransUnion CIBIL with respect to the Transaction. A printed version of these Terms and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to these Terms to the same extent and subject to the same conditions as any other documents and records originally generated and maintained in printed form.

I/We agree and understand that that any and all information contained in the Reports and the Products and Services has been collated by TransUnion CIBIL based on the information provided by its various member banks and credit institutions (Members). Consequently, TransUnion CIBIL shall not be responsible for the accuracy, completeness, and veracity of any and all such information as provided by the Members and shall not be liable for any loss or damage caused to me/us by relying on such information. I/We also understand that the information is current only up to date to such extent as provided to the Members and is subject to changes and amendments made thereafter and that any information contained herein does not reflect the views of TransUnion CIBIL or its directors or employees. Every TransUnion CIBIL and/or its officers, directors and/or employees shall be required to indemnify me/us for reasons/consequences arising out of the Transaction.

I/We understand and agree that the information contained in the Reports shall be updated upon such dates which the relevant Members with whom I/we have a relationship with, has provided information to TransUnion CIBIL based upon which updated information TransUnion CIBIL has been able to update the Reports and TransUnion CIBIL shall not be responsible in the event my information is not updated as of the date of the request.

I/We understand and agree that TransUnion CIBIL shall not be required to seek prior permission from me/us for updating information that may be reported to TransUnion CIBIL by the Members or otherwise come to the information of TransUnion CIBIL, and TransUnion CIBIL shall not be responsible to verify the correctness or veracity of the information received or reviewed. TransUnion CIBIL shall be entitled to make available and disclose to Members and such other persons as permitted under applicable law, all such information as provided by me/us.

TransUnion CIBIL reserves the right to initiate legal proceedings including criminal proceedings against the perpetrators of fraud, money laundering or any other forms of wrong doing in relation to the Products and Services. I/We have read and I/we expressly understand and agree to the steps to be taken by TransUnion CIBIL to ascertain my identity and I/we shall have no claim against TransUnion CIBIL in this regard.

I/We understand and agree that in the event there are three insufficiencies in the Request Form and/or the payment mechanism, my/our Request Form (as hereinafter defined) shall be liable to be rejected and I/we shall have to make fresh applications. I/We further understand and agree that upon such time, the fee/charges paid, where applicable thereunder, may be forfeited, and no refund shall be initiated by me/us.

An insufficiency in the Request Form would have taken place, including but not limited to, any of the following reasons:
- Demand Draft (DD) not provided along with the Request Form.
- Incorrect payee name on DD.
- DD is not payable at Mumbai.
- DD amount, as required, less than the requisite charges for the relevant Products and Services as specified in Clause 3 hereunder.
- Invalidity of DD (should be within 3 months from the date of receipt by TransUnion CIBIL).
- Online payment failure.
- Address proof not provided, invalid/not acceptable as defined by TransUnion CIBIL or is expired (not currently relevant).
- ID proof not provided or is invalid/not acceptable as defined by TransUnion CIBIL or is expired (not currently relevant).
- Address or ID proof does not match with that provided on the Request Form.
- Personal Information not matching on the Reports and/or Request Form and/or the identification documents provided.
- Signature not provided/Signature does not match.
- Board resolution/letter of authorisation, authorising an officer of the entity/Person to apply for a Commercial CIR is not provided or is invalid/not acceptable as defined by TransUnion CIBIL.
- ID proof for the authorised signatory (only for an application for a Commercial CIR) is not provided or is invalid/not acceptable as defined by TransUnion CIBIL.`,
  },
  {
    id: "request-forms",
    heading: "Request Forms for Products and Services and Proof of Identity and Address",
    body: `I/We understand that all applications for the Reports and/or the Products and Services shall be provided by TransUnion CIBIL only on the submission by me/us of the duly completed request forms, the Credit Information Report Request Form and the Company Credit Information Report Request Form, as may be applicable, for the Reports and/or the relevant Products and Services, as may be applicable, or through the user form available on TransUnion CIBIL's website (collectively, the "Request Form"), along with the applicable charges and requisite supporting documentation.

I/We agree to comply with KYC requirements as required by TransUnion CIBIL and specified by TransUnion CIBIL from time to time.

I/Any application made by me/us other than in the prescribed Request Form or which are incomplete in any manner shall not be considered a valid application and will be rejected by TransUnion CIBIL without providing any reason whatsoever.

All details provided by me/us in the Request Form should match the details provided by me/us to any of the Members when I/we have any type of relationship with or in the event I/we do not have any relationship with any Member, the details that are similar to that as provided in the Address Proof (as defined hereinafter) as furnished herein.

Proof of my/our identity (Identity Proof) and proof of my/our address (Address Proof) shall be required to be submitted by me/us along with the Request Form, and in the event the Request Form is submitted with a set of ID and Address Proof, we shall in no manner be required to be posted by me/us to TransUnion CIBIL at the following address (Processing Address) Consumer Relations, TransUnion CIBIL Limited, One Indiabulls Center, 19th Floor, Tower 2A, Senapati Bapat Marg, Elphinstone Road, Mumbai – 400 013.

TransUnion CIBIL shall not be responsible if any of the documents relating to my/our Identity Proof or Address Proof are lost in transit prior to receipt of such documents by TransUnion CIBIL at the abovementioned processing address.

I/We agree that all documents provided along with the Request Form shall be valid and should not have expired, as applicable. Further I/we agree that copies of the documents provided shall not be returned by TransUnion CIBIL irrespective of the fact whether or not the Credit Information Report or any of the Products and Services is issued or provided to me/us.

All documents relating to the Request Form, Identity Proof and Address Proof must reach TransUnion CIBIL at its Processing Address within 7 (seven) business days of the date of filing of the Request Form. Payment of appropriate charges and any documents, payments, or forms received after the aforesaid period shall be considered as invalid and TransUnion CIBIL shall not be required to process the same, in which case a fresh application, in the prescribed form, along with the requisite charges shall be required to be made.

I/We acknowledge and agree that in the event that I/we submit any incomplete information provided by me/us in the Request Form, or the Products and Services requested by me/us in this regard shall be at my/our own risk and TransUnion CIBIL shall not be liable to refund any payments made by me/us in this regard and that I/we shall have to make a fresh Request Form.

I/We understand that TransUnion CIBIL is not liable if the Products and Services or any correspondence in relation thereto could not be delivered to me/us at the address specified by me/us in the Request Form.`,
  },
  {
    id: "consent-whatsapp",
    heading: "Consent for Services and Sharing Personal Data / Sensitive Personal Data / Information through WhatsApp",
    body: `I hereby agree and consent to TransUnion CIBIL for providing the Services through WhatsApp as a medium.

I further agree that any consent in relation to the Services given by the User to TransUnion CIBIL through mobile number/any authentication through registered mobile available with TransUnion CIBIL, shall be binding on the User.

I hereby expressly agree and consent to TransUnion CIBIL for sharing of my/our Personal Data/Sensitive Personal Data/ Information as provided by the User, including information which may constitute as sensitive personal data or information within the meaning of the applicable laws and regulations, for the purposes of providing me/our Report or other Products and Services delivered at my/our registered mobile number.

I/We understand that the payment gateway and net banking channels may not belong to TransUnion CIBIL and agree to be bound by the rules and regulations and terms prescribed by such third party in the processing of facilitating my/our payment through the said payment validation website.

I/We further understand and agree that in the event any information/data is shared by me/us on WhatsApp, the same shall be governed by the terms and conditions of WhatsApp and TransUnion CIBIL shall not be responsible or liable in any manner whatsoever for such information/data shared or received on WhatsApp.

I/We understand that unless expressly withdrawn by me/us in writing, the consent granted hereunder shall remain valid and subsisting for the duration of my/our relationship with TransUnion CIBIL and for such further period as may be required under applicable law.`,
  },
  {
    id: "payment-modes",
    heading: "Payment Modes",
    subsections: [
      {
        heading: "Payment through Demand Draft",
        body: `I/We understand that for any payment for the Products and Services through a DD (or Demand Draft) for the stipulated charges for the Products and Services in favour of "TransUnion CIBIL Limited", payable at Mumbai has to be sent at the Processing Address as mentioned above.`,
      },
      {
        heading: "Payment through Credit Cards / Debit Cards",
        body: `I/We understand that any payment for the Products and Services through my/our VISA or MASTERCARD or other service provider (as provided by the Payment Gateway Merchant) Credit Card or Debit Card as the case may be, may be made.`,
      },
      {
        heading: "Payment through Net Banking",
        body: `I/We understand that a payment of the stipulated charges for Reports and/or Products and Services may be made through my/our Net Banking channel.`,
      },
    ],
  },
  {
    id: "terms-of-payment",
    heading: "Terms of Payment",
    body: `Charges for Credit Information Report (Company Credit Information Report): I/We agree to pay such amount as stipulated by TransUnion CIBIL for the issue of my Credit Information Report/our Company Credit Information Report. The charges are inclusive of delivery charges, payment gateway charges (if any) and all applicable taxes.

Charges for Products and Services: I/We agree to pay the charges for Products and Services as stipulated by TransUnion CIBIL, and understand that such charges for Products and Services are exclusive of delivery charges and applicable taxes if levied, and we agree to pay such additional amounts as may be stipulated by TransUnion CIBIL towards the delivery charges and taxes and levies.

If the payment is made through DD:
- The DD should clearly state the name as mentioned above without any spelling mistakes and should be payable at Mumbai.
- Processing of the Request Form shall take place only after TransUnion CIBIL realises the payment through the DD for the full amount. In the event there is any error of any nature in the DD, the relevant Request Form shall not be processed unless a fresh DD for the requisite amount as stated above is sent to TransUnion CIBIL at the Processing Address with all other details as required herein. Further, I/we acknowledge and understand that TransUnion CIBIL shall not be liable to refund the amount of any DD which is received and I/we shall have to make a fresh application.

If the payment is made through Credit Card or Debit Card:
- I/We represent that the Credit Card or Debit Card used by me/us to make payment herein, is my/our own Credit Card or Debit Card or that I/we have full authority and permission to use the same to make payment herein.
- I/We understand that if the payment made through the Credit Card or Debit Card is not honoured, TransUnion CIBIL shall be entitled to withhold the Products and Services requested by me/us, and shall not be liable in any manner whatsoever for the same.
- I/We understand and agree that TransUnion CIBIL shall not be responsible for any fraud that may be committed on my/our net banking account or credit card account, and that TransUnion CIBIL shall not be liable to me/us in any manner whatsoever.

If the payment is made through Net Banking:
- I/We shall use only my/our own net banking account details to transact on this Website or have full authority and permission to use the net banking account to make payment as requested herein.
- I/We understand and agree that TransUnion CIBIL is not responsible for any fraud that may be committed on my/our net banking account, and TransUnion CIBIL shall not be liable to me/us in any manner whatsoever.`,
  },
  {
    id: "grievance",
    heading: "Raising a Grievance over any Information",
    body: `A grievance request can be raised by me/us by visiting TransUnion CIBIL website at [www.cibil.com](https://www.cibil.com) and [www.transunioncibil.com](https://www.transunioncibil.com). TransUnion CIBIL will initiate the dispute with the relevant credit institution and rectify appropriately.

I/We agree and understand that TransUnion CIBIL supports its role as a repository of credit information and does not have the authority to modify or make any changes to the information provided by the Members without the express consent of such Member(s). TransUnion CIBIL shall take up the matter with the relevant Member(s) and revert to me/us with the resolution as received from the Member(s), and shall not be obligated to process the request in the manner sought by me/us.`,
  },
  {
    id: "refunds",
    heading: "Refunds and Charge Back",
    body: `I/We agree and understand that in the event a request is not made or a service is not a valid request, or if it is rejected by TransUnion CIBIL for any reasons whatsoever or TransUnion CIBIL is unable to provide the same, I/we agree to pay to TransUnion CIBIL, processing charges and TransUnion CIBIL shall refund to me/us the amount received by it, after deducting the aforesaid processing charges.

Only for the following reasons and any other reasons deemed by TRANSUNION CIBIL at its sole discretion, I/We shall not be required to make payments in the manner as stated above, and TransUnion CIBIL shall refund the payments made by me/us as may be applicable:
- Where the Products and Services requested by me/us are not delivered.
- Where a duplicate payment for the same Product or Service has been made.

In case of Transactions through Net Banking/using Debit or Credit Cards and in the event of a fraudulent transaction carried out on my/our account without my/our authority, I/we may notify TransUnion CIBIL immediately and TransUnion CIBIL shall, upon verification, initiate a refund of the amount so debited.

In the event of any technical snag/system error/or improper and/or TransUnion CIBIL and/or the issuing bank wherein my/our transaction could not be completed, whereby I/we have been charged, TransUnion CIBIL shall refund the amount so charged to me/us.

All refunds shall be processed within a period of 15 (fifteen) business days from the date of receipt of the refund request and shall be credited to the same account/instrument from which the payment was originally made.`,
  },
  {
    id: "delivery",
    heading: "Delivery of Reports and other Products and Services",
    body: `I/We agree and understand that the delivery of the Reports and/or Products and Services will be provided through a type based dashboard. The access will be provided only basis successful authentication as per TransUnion CIBIL's standard authentication process.

On any change in my personal information and/or address, I/we shall update my address in the records of the relevant Members with whom I/we have my respective relationship account/s, else, TransUnion CIBIL would not be able to deliver the Report at my/our desired address.

I/We understand and agree that in case I/we provide email address for delivery of the Reports and/or Products and Services by opting for delivery through email, TransUnion CIBIL shall not be responsible for the correctness of the email ID and delivery of the Report to any incorrect email ID. TransUnion CIBIL shall not be liable and/or responsible for any transmission of the Report or the Products and Services.

I/We agree, confirm and authorise TransUnion CIBIL, its registered service provider and/or courier partner to deliver the Products and Services to me/us at the address specified by me/us in the Request Form.`,
  },
  {
    id: "disclaimer",
    heading: "Disclaimer of Warranties and Limitation of Liability",
    body: `I/We acknowledge, understand and agree that by providing the Reports and the Products and Services (whether through this Website or [www.cibil.com](https://www.cibil.com) and [www.transunioncibil.com](https://www.transunioncibil.com) or otherwise), TransUnion CIBIL is acting as a facilitator, and does not warrant that the functions contained in the above-mentioned Website/s will be uninterrupted or error free, that defects will be corrected, or that the Website or the server that makes it available is free of viruses or other harmful components. TransUnion CIBIL does not make any warranties or representations regarding the use of the material in the Website in terms of their correctness, accuracy, adequacy, usefulness, timeliness, reliability or otherwise.

I/We acknowledge, understand and agree that, without limiting the above clause 3, TransUnion CIBIL shall not be responsible and disclaims all responsibilities for any claim, liability, or any damage resulting from, arising out of, or in any way related to: (a) the use or the inability to use the Report/s and/or the Products and Services or the Website; (b) the cost of procurement of substitute goods and services; (c) unauthorised access to or alteration of transmissions or data; (d) any other matter relating to the provision of services for underlying products, services or transactions on the Website.

I/We agree that any claim or liability, howsoever arising, in relation to the Products and Services provided by TransUnion CIBIL, shall be limited to the amount paid by me/us for the specific Products and Services, and TransUnion CIBIL shall not be liable for any indirect, incidental, special, consequential or punitive damages.

I/We acknowledge, understand and agree that TransUnion CIBIL shall not be responsible or liable in any manner whatsoever for any decision taken by any Member or any third party on the basis of the information contained in the Reports and/or the Products and Services.

I/We acknowledge and accept that no information with regard to the Report/s, the Request Form, the Products or any of the Products and Services shall be provided over the telephone or in person or else e-mail excluding over the telephone at the number provided in the Request Form or through such e-mail address as may be specified.

I/We understand and agree that TransUnion CIBIL expressly disclaims all warranties, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

I/We agree that the Website/s are provided on an "as is" and "as available" basis and I/we agree that my/our access to and use of the Website and the Products and Services shall be at my/our own risk.

Apart from above, the respective Report/s and/or Products and Services shall have their disclaimers / caveat, acknowledge and accept the same.`,
  },
  {
    id: "miscellaneous",
    heading: "Miscellaneous",
    subsections: [
      {
        heading: "1. Severability",
        body: `In the event that any provision of these Terms is determined by any judicial or other competent authority to be void, invalid, illegal or otherwise unenforceable or indications of the same are received by either me/us or TransUnion CIBIL from any relevant competent authority, TransUnion CIBIL shall have the right to amend that provision in such reasonable manner as it thinks fit without illegality or it may be severed from these Terms and the remaining provisions of these Terms shall remain in full force and effect unless TransUnion CIBIL, in its sole discretion, decides that the provision of the Report/s and/or Products and Services either wholly or in part.`,
      },
      {
        heading: "2. Variation",
        body: `A furtherance of these Terms and subject to applicable laws, I/we understand that TransUnion CIBIL reserves the right to cease further directions which shall be applicable to me/us from time to time. Other than as otherwise provided by these Terms, all alterations to these Terms shall be made by TransUnion CIBIL with an intimation on the Website and shall become applicable upon such intimation and shall be applicable prospectively. Any amendment shall be effective from such date as may be specified by TransUnion CIBIL and it shall be deemed that I/we have accepted such amendments if I/we continue to avail of the Products and Services after such date.`,
      },
      {
        heading: "3. Non-Assignment",
        body: `I/We agree not to assign, transfer or otherwise deal with these Terms, or the rights and obligations hereunder, or any part thereof, without the prior written consent of TransUnion CIBIL. TransUnion CIBIL shall have the right to assign or transfer these Terms and its rights and obligations hereunder to any of its affiliates, directors, employees, agents, advisors, affiliates, successors and assigns, without the requirement of any prior consent from me/us.`,
      },
      {
        heading: "4. Indemnification",
        body: `I/We agree to defend, indemnify, and hold harmless TransUnion CIBIL, its officers, directors, employees, agents, licensors, affiliates, successors and assigns from and against any and all loss, damage, liability, claim, demand, suit, cost and expense (including court costs and reasonable attorney fees) suffered/incurred by/on the case required by TransUnion CIBIL, and/or resulting from my/our breach of these Terms or from any misuse of the Products and Services or any violation of applicable law.`,
      },
      {
        heading: "5. Miscellaneous",
        body: `I/We agree that TransUnion CIBIL, with the right to use any data and information provided by me/us vide the Request Form and/or otherwise, and TransUnion CIBIL shall be entitled to store, use, process, disclose and transfer such data and information in accordance with applicable law.

I/We understand that by providing my/our mobile number and email address, I/we have expressly consented to receiving communication (including SMS, email and voice calls) from TransUnion CIBIL and/or its authorised agents in relation to the Products and Services, notwithstanding my/our registration under the National Do Not Call Registry or the National Customer Preference Register.

I/We further understand and confirm that TransUnion CIBIL may monitor and record any telephone conversation between me/us and TransUnion CIBIL for quality and training purposes.`,
      },
      {
        heading: "6. Force Majeure",
        body: `TransUnion CIBIL shall not be liable for any failure to perform any of its obligations under these Terms (in whole or in part) if the performance is prevented, hindered or delayed by a Force Majeure Event and in such case its obligations shall be suspended for so long as the Force Majeure Event continues. A Force Majeure Event shall include, without limitation, any act of God, war, riot, civil commotion, strike, lockout, terrorist activity, fire, flood, epidemic, pandemic, failure of telecommunication or internet services, power outages, or any change in applicable law or regulation, or any act of any Government or regulatory authority.`,
      },
      {
        heading: "7. Governing Law, Jurisdiction and Arbitration",
        body: `In the event of any claim, dispute or difference arising out of or in relation to these Terms, the claim, dispute or difference shall be referred to a sole arbitrator to be appointed by TransUnion CIBIL. The arbitration proceedings shall be conducted in accordance with the provisions of the Arbitration and Conciliation Act, 1996 and any statutory modification or re-enactment thereof for the time being in force. The seat and venue of the arbitration shall be Mumbai, India and the language of the arbitration shall be English. The award of the arbitrator shall be final and binding on the parties.

These Terms shall be governed by and be subject to Indian laws, and subject to the arbitration provision above, the courts and tribunals at Mumbai shall have exclusive jurisdiction over any claim, dispute or difference arising out of or in relation to these Terms.`,
      },
    ],
  },
];
