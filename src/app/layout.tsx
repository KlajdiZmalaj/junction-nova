import GlobalProvider from "@/contexts/Global";
import APIProvider from "@/contexts/API";
import { PropsWithChildren } from "react";
import "@/utils/primesettings";

export const metadata = {
  title: "Fole Management",
  description: "Building Visualization , Contract Management , Room Status , Resident Profiles",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <APIProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </APIProvider>
      </body>
    </html>
  );
}
