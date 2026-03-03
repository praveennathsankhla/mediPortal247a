import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | mediportal247",
    description: "Get in touch with the mediportal247 team for inquiries, feedback, or collaborations.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
