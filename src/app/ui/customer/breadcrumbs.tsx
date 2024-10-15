"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface BreadCrumbComponentProps {
  previous: string;
  category: string | null;
}

const BreadCrumbComponent = ({
  previous,
  category,
}: BreadCrumbComponentProps) => {
  const searchParams = useSearchParams();

  const pathname = usePathname()

  const pathSegments = pathname.split("/");

  useEffect(() => {
    pathSegments.forEach((segment) => {
      console.log(segment)
    })

    console.log("ref: ", document.referrer)
  }, [])

  const base = decodeURIComponent(searchParams.get("base") || "");
  const name = decodeURIComponent(searchParams.get("name") || "");
  const path = decodeURIComponent(searchParams.get("path") || "");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {base && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {name || path ? (
                  <BreadcrumbLink asChild>
                    <Link href={`/${base}?base=${encodeURIComponent(base)}`}>
                      {base[0].toUpperCase() + base.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {base[0].toUpperCase() + base.slice(1)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}

          {path && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {name ? (
                  <BreadcrumbLink asChild>
                    <Link href={`/${base}/${path}?base=${encodeURIComponent(base)}&path=${encodeURIComponent(path)}`}>
                      {path[0].toUpperCase() + path.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {path[0].toUpperCase() + path.slice(1)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}

          {name && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {name[0].toUpperCase() + name.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbComponent;
