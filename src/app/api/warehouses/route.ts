import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

//todo: check aut
export async function POST(request: Request) {
  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await warehouseSchema.parse(requestData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  try {
    await db.insert(warehouses).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: "Failed to store the warehouse" },
      { status: 500 }
    );
  }
}
