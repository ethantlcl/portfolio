import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Ethan | Porfolio",
  description: "A frontend developer by profession, a creative at heart.",
  keywords: "Ethan, Portfolio",
  authors: [{ name: "Ethan Tran" }],
  creator: "MEthan Tran",
  publisher: "Ethan Tran",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Ethan Tran - Just Exploring",
    description: "Student by profession, creative at heart.",
    url: "AUBREY1028",
    siteName: "Ethan Tran's Portfolio",
    locale: "en_US",
    images: ["/cover.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Tran - Just Exploring",
    description: "Student by profession, creative at heart.",
    images: ["/cover.jpg"],
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'}/>
    </html>
  );
}
