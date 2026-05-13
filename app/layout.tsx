import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  const gaId = "G-7WD4HM3XRE";

  return (
    <html lang="en" className="overscroll-y-none">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
