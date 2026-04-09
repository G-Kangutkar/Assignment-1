import supabase from "../config/supabase.config.js";

// GET /search
// Supported params: q (product_name), minPrice, maxPrice
export const searchInventory = async (req, res) => {
  try {
    const { q, minPrice, maxPrice } = req.query;

    let query = supabase.from("inventory").select("*");

    if (q?.trim()) {
      query = query.ilike("product_name", `%${q.trim()}%`);
    }

    if (minPrice) {
      query = query.gte("price", parseFloat(minPrice));
    }

    if (maxPrice) {
      query = query.lte("price", parseFloat(maxPrice));
    }

    query = query.order("id", { ascending: true });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      status: true,
      count: data.length,
      filters: { q, minPrice, maxPrice },
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};