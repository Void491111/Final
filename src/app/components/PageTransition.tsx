"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ROUTE_DEPTH: Record<string, number> = {
  "/": 0,
  "/notifications": 1,
};

function getDepth(pathname: string): number {
  return ROUTE_DEPTH[pathname] ?? 1;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevDepthRef = useRef(getDepth(pathname));
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    const prevDepth = prevDepthRef.current;
    const nextDepth = getDepth(pathname);

    if (prevDepth === nextDepth) return;

    const cls = nextDepth > prevDepth ? "slide-in-right" : "slide-in-left";
    prevDepthRef.current = nextDepth;

    // Defer setState keluar dari effect body
    const enterTimer = setTimeout(() => setAnimClass(cls), 0);
    const clearTimer = setTimeout(() => setAnimClass(""), 300);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(clearTimer);
    };
  }, [pathname]);

  return <div className={`page-transition ${animClass}`}>{children}</div>;
}