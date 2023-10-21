"use client";

import ProtectedPage from "@/containers/ProtectedPage";
import Login from "@/containers/Login/";

export default function Page() {
  return (
    <ProtectedPage isPublic>
      <Login />
    </ProtectedPage>
  );
}
