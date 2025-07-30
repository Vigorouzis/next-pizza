import { Header } from "@/components/shared/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza",
}

export default function ProductLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {children}
      {modal}
    </main>
  );
}
