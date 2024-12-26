import Product from "../../../models/Product";
import connectToDB from "../../../libs/db/mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    await connectToDB();

    const products = await Product.aggregate([
      // First, normalize the product names and variants
      {
        $addFields: {
          normalizedName: {
            $trim: {
              input: {
                $toLower: {
                  $replaceAll: {
                    input: "$name",
                    find: " ",
                    replacement: "",
                  },
                },
              },
            },
          },
          normalizedVariant: {
            $trim: {
              input: {
                $toLower: {
                  $replaceAll: {
                    input: { $ifNull: ["$variant", ""] },
                    find: " ",
                    replacement: "",
                  },
                },
              },
            },
          },
        },
      },
      // Group by normalized name and variant
      {
        $group: {
          _id: {
            name: "$normalizedName",
            variant: "$normalizedVariant",
          },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              variant: "$variant",
              image: "$image",
              category: "$category",
              platform: "$platform",
              currentPrice: "$currentPrice",
              actualPrice: "$actualPrice",
              available: "$available",
              priceHistory: "$priceHistory",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
          uniquePlatforms: { $addToSet: "$platform" },
        },
      },
      // Only keep groups with multiple platforms
      {
        $match: {
          $expr: {
            $gt: [{ $size: "$uniquePlatforms" }, 1],
          },
        },
      },
      // Sort by creation date
      {
        $addFields: {
          firstProduct: { $arrayElemAt: ["$products", 0] },
        },
      },
      {
        $sort: {
          "firstProduct.createdAt": -1,
        },
      },
      // Apply pagination
      { $skip: skip },
      { $limit: limit },
    ]);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
