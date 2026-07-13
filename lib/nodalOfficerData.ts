/**
 * SAMPLE DATA — not the real nodal officer register.
 *
 * The live site backs this page with a feed of every member institution's nodal officer. This
 * repo has no such feed, so these rows exist to make the page's search resolve. The institution
 * names are real CIBIL member institutions; the contact details are deliberately placeholders
 * (example.com addresses, 0000 phone numbers) and must never be presented as genuine — the page
 * renders a visible note saying so. Replace this file with the real feed before going live.
 */
export interface NodalOfficer {
  /** Member institution — a proper noun, so it is not translated. */
  institution: string;
  city: string;
  email: string;
  phone: string;
}

export const NODAL_OFFICERS: NodalOfficer[] = [
  { institution: "State Bank of India", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0001" },
  { institution: "HDFC Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0002" },
  { institution: "ICICI Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0003" },
  { institution: "Axis Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0004" },
  { institution: "Kotak Mahindra Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0005" },
  { institution: "Bank of Baroda", city: "Vadodara", email: "nodal.officer@example.com", phone: "+91 265 000 0006" },
  { institution: "Punjab National Bank", city: "New Delhi", email: "nodal.officer@example.com", phone: "+91 11 0000 0007" },
  { institution: "Canara Bank", city: "Bengaluru", email: "nodal.officer@example.com", phone: "+91 80 0000 0008" },
  { institution: "Union Bank of India", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0009" },
  { institution: "Bank of India", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0010" },
  { institution: "IndusInd Bank", city: "Pune", email: "nodal.officer@example.com", phone: "+91 20 0000 0011" },
  { institution: "IDFC FIRST Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0012" },
  { institution: "Yes Bank", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0013" },
  { institution: "Bandhan Bank", city: "Kolkata", email: "nodal.officer@example.com", phone: "+91 33 0000 0014" },
  { institution: "Federal Bank", city: "Kochi", email: "nodal.officer@example.com", phone: "+91 484 000 0015" },
  { institution: "Indian Bank", city: "Chennai", email: "nodal.officer@example.com", phone: "+91 44 0000 0016" },
  { institution: "Bajaj Finance Limited", city: "Pune", email: "nodal.officer@example.com", phone: "+91 20 0000 0017" },
  { institution: "Tata Capital Limited", city: "Mumbai", email: "nodal.officer@example.com", phone: "+91 22 0000 0018" },
  { institution: "Shriram Finance Limited", city: "Chennai", email: "nodal.officer@example.com", phone: "+91 44 0000 0019" },
  { institution: "Muthoot Finance Limited", city: "Kochi", email: "nodal.officer@example.com", phone: "+91 484 000 0020" },
];

/** Case-insensitive match on the institution name — what the page asks the reader to type. */
export function searchNodalOfficers(query: string): NodalOfficer[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return NODAL_OFFICERS.filter((officer) => officer.institution.toLowerCase().includes(needle));
}
