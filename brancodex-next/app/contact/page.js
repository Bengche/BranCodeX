import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Contact BranCodeX | Get a Free Quote",
  description:
    "Tell BranCodeX about your project. Web development agency in Bamenda, Cameroon. Send a message, book a free call or reach us on WhatsApp. We reply within 24 hours.",
  alternates: { canonical: "https://brancodex.com/contact" },
  openGraph: {
    title: "Contact BranCodeX | Get a Free Quote",
    description:
      "Ready to build your website? Tell us about your project and get a quote within 24 hours.",
    url: "https://brancodex.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Contact asPage />
      </main>
      <Footer />
    </>
  );
}
