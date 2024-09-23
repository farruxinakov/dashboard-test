"use client";

import { useEffect, useState } from "react";

import useAuthModal from "@/store/use-auth-modal";

import AuthModal from "@/components/modals/auth-modal";

export default function SignInPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen, onOpen } = useAuthModal();

  useEffect(() => {
    setIsMounted(true);

    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  if (!isMounted) return null;

  return <AuthModal />;
}
