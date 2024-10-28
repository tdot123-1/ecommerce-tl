import { NextResponse } from "next/server";

// (!!) currently not used
export async function DELETE(request: Request) {
  console.log(request);

  return NextResponse.json({ message: "Image deleted" }, { status: 200 });
}
