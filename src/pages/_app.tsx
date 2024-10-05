import "@test-task/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  });

  return (
    <main className={inter.className}>
      <Component {...pageProps} />;
    </main>
  );
}
