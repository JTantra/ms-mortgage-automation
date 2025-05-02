import { Suspense } from "react";
import AppHeader from "@/components/app-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AppHeader />
      {children}
    </Suspense>
  );
}