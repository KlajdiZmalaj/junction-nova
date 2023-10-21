"use client";
import Home from "@/containers/Home/";
import ProtectedPage from "@/containers/ProtectedPage";

export default function Page() {
  return (
    <ProtectedPage>
      <Home />
    </ProtectedPage>
  );
}
