import { Providers } from "./providers";
import { Source_Code_Pro } from "next/font/google";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Ganti ini</title>
      <body className={source_code_pro.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
