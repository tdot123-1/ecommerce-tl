// (!) currently not used
// (!) could be used for cron job to delete all images not related to any product
// (!) need to add env variable CRON_SECRET
// (!) need to rethink and verify necessity

// import { cleanupOrphanedBlobs } from "@/lib/actions";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const authHeader = request.headers.get("Authorization");
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   try {
//     await cleanupOrphanedBlobs();
//     return Response.json({ message: "Cleanup succesfull" }, { status: 200 });
//   } catch (error) {
//     console.error("ERROR DELETING BLOBS: ", error);
//     return Response.json({ message: "Error deleting blobs" }, { status: 500 });
//   }
// }

export function GET() {
  return Response.json({ message: "Route not yet in use" }, { status: 200 });
}
