import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuthentication(sentTo) {
  const router = useRouter();

  useEffect(() => {
    router.push(sentTo);
  }, [router]);
}
