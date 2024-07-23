import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";

export async function POST(request: Request) {
  const requestData = await request.json();
  let validatedData;

  try {
    validatedData = inventorySchema.parse(requestData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  try {
    const response = await db.insert(inventories).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    console.error("Error saving to database:", error);
    return Response.json(
      { message: "Failed to store inventory into the database" },
      { status: 500 }
    );
  }
}
