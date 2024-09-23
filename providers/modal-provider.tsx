"use client";

import { useEffect, useState } from "react";

import BankModal from "@/components/modals/bank-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <BankModal />
    </>
  );
};

export default ModalProvider;
