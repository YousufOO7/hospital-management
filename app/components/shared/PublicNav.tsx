"use client";

import { publicNavigationLinks } from "@/app/lib/utlis/common/navigation/publicNavigationLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PublicNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b hidden md:block py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Nav Links */}
        <div className="flex w-full justify-between items-center">
          <div>
            {/* Logo */}
            {/* <span className="">{isLoading ? <ButtonLoader /> : platformName}</span> */}
            <p className="text-xl font-bold text-black">Hospital Management</p>
          </div>
          <div className="space-x-8">
            {publicNavigationLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-[12px]  text-black font-bold py-4 uppercase ${
                  pathname === link.href ? "border-b-2 border-black" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* login */}
          <div>
            <Button variant={"default"}>Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNav;
