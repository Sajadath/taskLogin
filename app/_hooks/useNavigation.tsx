"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
  const router = useRouter();

  const navigateTo = useCallback(
    (url: string, options: { replace?: boolean; prefetch?: boolean } = {}) => {
      if (options.prefetch) {
        router.prefetch(url);
      }
      if (options.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [router]
  );

  return { navigateTo };
}
