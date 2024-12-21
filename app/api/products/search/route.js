import Product from "../../../../models/Product";
import connectToDB from "../../../../libs/db/mongodb";
import { NextResponse } from "next/server";

const normalizeText = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
};

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ products: [] });
    }

    await connectToDB();

    // Get all products that match the search query
    const allProducts = await Product.find({
      $or: [
        // Use text index search
        { $text: { $search: query } },
        // Use regex for partial matches
        { name: { $regex: query, $options: "i" } },
      ],
    });

    // Group similar products
    const groupedProducts = {};

    allProducts.forEach((product) => {
      const normalizedName = normalizeText(product.name);
      const key = `${normalizedName}_${product.variant}`;

      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          _id: key,
          products: [],
        };
      }

      groupedProducts[key].products.push(product);
    });

    // Filter groups to only include those with products from different platforms
    const products = Object.values(groupedProducts)
      .filter((group) => {
        const platforms = new Set(group.products.map((p) => p.platform));
        return platforms.size > 1;
      })
      .map((group) => ({
        _id: group._id,
        products: group.products.sort(
          (a, b) =>
            parseFloat(a.currentPrice.replace("₹", "")) -
            parseFloat(b.currentPrice.replace("₹", ""))
        ),
        uniquePlatforms: [...new Set(group.products.map((p) => p.platform))],
      }))
      .sort((a, b) => b.products[0].createdAt - a.products[0].createdAt)
      .slice(0, 10);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
