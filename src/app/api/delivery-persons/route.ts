import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await deliveryPersonSchema.parse(requestData);
    console.log("Here is validated data", validatedData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  try {
    const data = await db.insert(deliveryPersons).values(validatedData);
    console.log("here is response", data);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: "Failed to store the delivery person into the database" },
      { status: 500 }
    );
  }
}
