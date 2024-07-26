import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  if (!pathname) return <div>Loading ...</div>;
  return (
    <header className="bg-blue-500 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Sexify</h1>
        {pathname && (
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <span className={isActive("/") ? "underline" : ""}>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/profile/edit">
                  <span
                    className={isActive("/profile/edit") ? "underline" : ""}
                  >
                    Edit Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <span className={isActive("/search") ? "underline" : ""}>
                    Search
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/messages">
                  <span className={isActive("/messages") ? "underline" : ""}>
                    Messages
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <span className={isActive("/settings") ? "underline" : ""}>
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
