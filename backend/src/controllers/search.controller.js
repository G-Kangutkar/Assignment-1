import supabase from "../config/supabase.config.js";



// GET /search
export const searchInventory = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    // Build Supabase query dynamically based on provided filters
    let query = supabase.from("inventory").select("*");

    // Partial, case-insensitive name search using Postgres ilike
    if (q?.trim()) {
      query = query.ilike("name", `%${q.trim()}%`);
    }

    // Case-insensitive exact category match
    if (category?.trim()) {
      query = query.ilike("category", category.trim());
    }

    // Price range filters (both optional, can be combined)
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
      filters: { q, category, minPrice, maxPrice },
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};