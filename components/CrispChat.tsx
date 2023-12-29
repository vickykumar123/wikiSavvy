"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("4ddb226b-49da-4e99-b7cd-87a18ca90e82");
  }, []);

  return null;
};
