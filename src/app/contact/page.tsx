import ContactForm from "@/components/features/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Anurag Ambuj",
    description: "Get in touch with Anurag Ambuj for software engineering opportunities.",
};

export default function ContactPage() {
    return <ContactForm />;
}
