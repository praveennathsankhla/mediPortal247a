import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | mediportal247 - Trustworthy Health Information",
    description: "mediportal247 is India's leading healthcare information portal, providing verified hospital profiles and expert medical awareness content.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
