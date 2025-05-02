"use server";

import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { CircleUser } from "lucide-react";

async function AppHeader() {
  return (
    <header className="flex shadow-sm w-full items-center justify-between py-2 px-4 sticky top-0 z-100 bg-white">
      <Link href="/">
        <Image
          src="/rhb-logo.webp"
          height={20}
          width={100}
          alt="RHB"
        />
      </Link>
      <Link href="#">
        <Button
          text
          rounded
          icon={<CircleUser size="2rem" className="text-gray-400" />}
        />
      </Link>
    </header>
  );
}

export default AppHeader;
