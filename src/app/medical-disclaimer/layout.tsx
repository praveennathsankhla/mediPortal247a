import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medical Disclaimer | mediportal247",
    description: "Important medical disclaimer regarding the information provided on mediportal247.",
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
