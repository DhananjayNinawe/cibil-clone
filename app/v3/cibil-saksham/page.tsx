import type { Metadata } from "next";
import SakshamContent from "@/components/v3/pages/SakshamContent";

export const metadata: Metadata = {
  title: "CIBIL Saksham",
  description:
    "CIBIL Saksham — a credit education platform by TransUnion CIBIL, with interactive courses on the fundamentals of credit and MSME financing.",
};

export default function Page() {
  return <SakshamContent />;
}
