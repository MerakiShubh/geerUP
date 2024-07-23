import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

export async function POST(request: Request) {
  //todo: check user access
  const data = await request.formData();

  let validateData;

  try {
    validateData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  const filename = `${Date.now()}.${validateData.image.name
    .split(".")
    .slice(-1)}`;
  const filepath = path.join(process.cwd(), "public/assets", filename);

  try {
    const buffer = Buffer.from(await validateData.image.arrayBuffer());
    await writeFile(filepath, buffer);
  } catch (err) {
    return Response.json(
      { message: "Failed to save the file to fs" },
      { status: 500 }
    );
  }

  try {
    await db.insert(products).values({ ...validateData, image: filename });
  } catch (err) {
    //todo: remove stored image from fs
    // Handle errors and delete the image if something goes wrong
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    return Response.json(
      { message: "Failed to store product into the database" },
      { status: 500 }
    );
  }
  // Delete the image from local after successfully saving to the database
  fs.unlinkSync(filepath);
  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
    return Response.json(allProducts);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
