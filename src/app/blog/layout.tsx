import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medical Awareness Blog | Health Tips & News - mediportal247",
    description: "Stay informed with the latest health tips, disease awareness articles, and medical news from across India.",
};

export default function BlogIndexLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
