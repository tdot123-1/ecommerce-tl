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
import { useSearchParams } from "next/navigation";

const BreadCrumbComponent = () => {
  // use search params to determine where user navigated from
  const searchParams = useSearchParams();

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

          {/* generate additional breadcrumbs based on where user navigated from */}
          {base && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* render link if this is not the final breadcrumb, else render page */}
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
                    <Link
                      href={`/${base}/${path}?base=${encodeURIComponent(
                        base
                      )}&path=${encodeURIComponent(path)}`}
                    >
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

          {/* final breadcrumb */}
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
