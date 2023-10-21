"use client";

import ProtectedPage from "@/containers/ProtectedPage";
import SingleBuilding from "@/containers/SingleBuilding";

export default () => {
  return (
    <ProtectedPage>
      <SingleBuilding />
    </ProtectedPage>
  );
};
