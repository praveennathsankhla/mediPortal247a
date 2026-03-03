import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top Cities for Healthcare in India | mediportal247",
    description: "Browse the best hospitals across major Indian cities including Delhi, Mumbai, Bangalore, and more.",
};

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
