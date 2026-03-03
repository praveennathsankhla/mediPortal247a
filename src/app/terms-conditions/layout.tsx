import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | mediportal247",
    description: "Review the terms and conditions for using mediportal247's healthcare information services.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
