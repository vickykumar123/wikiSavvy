"use client";

import { useMounted } from "@/hooks/useMounted";
import { ProModal } from "./ProModal";

export function ModalProvider() {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <ProModal />
    </>
  );
}
