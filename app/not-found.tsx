"use client";

import { useRouter } from "next/navigation";

import { Heading } from "@/components/custom-ui/heading";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-4 p-8">
      <Heading size="h3">Page is not founded : /</Heading>
      <Button onClick={() => router.back()}>Go back</Button>
    </div>
  );
}
