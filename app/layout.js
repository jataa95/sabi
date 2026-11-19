import { Azeret_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const azeret = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500", "700", "800"], variable: "--font-azeret" });
const serif = Source_Serif_4({ subsets: ["latin"], style: ["italic"], weight: ["500", "600", "700"], variable: "--font-serif4" });

export const metadata = {
  metadataBase: new URL("https://sabilifestyle.vercel.app"),
  title: { default: "SABI LIFESTYLE — For those who know", template: "%s — SABI LIFESTYLE" },
  description: "SABI LIFESTYLE is a clothing brand from Lagos, Nigeria. Tees, hoodies, tracksuits and more, for those who know.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="top" className={`${azeret.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("sabi-loader"))document.documentElement.classList.add("seen-loader")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <CartProvider>
          <Preloader />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Reveal />
        </CartProvider>
      </body>
    </html>
  );
}
