import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Next.js 16+ request hook (Node). Replaces deprecated Edge `middleware.ts`. */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}
