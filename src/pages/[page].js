import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return <div>test page</div>;
}
