"use client";

import ProtectedPage from "@/containers/ProtectedPage";
import SingleFloor from "@/containers/SingleFloor";

export default () => {
  return (
    <ProtectedPage>
      <SingleFloor />
    </ProtectedPage>
  );
};
