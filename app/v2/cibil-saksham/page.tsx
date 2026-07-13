import type { Metadata } from "next";
import SakshamContent from "@/components/v2/pages/SakshamContent";

export const metadata: Metadata = {
  title: "CIBIL Saksham",
  description:
    "CIBIL Saksham is a credit education platform by TransUnion CIBIL, with interactive courses on credit and MSME financing.",
};

export default function CibilSakshamPage() {
  return <SakshamContent />;
}
