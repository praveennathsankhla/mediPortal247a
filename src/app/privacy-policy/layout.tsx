import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | mediportal247",
    description: "Learn how mediportal247 collects, uses, and protects your personal information in accordance with healthcare data standards in India.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
