import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
