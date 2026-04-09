import supabase from "../config/supabase.config.js";

// POST /supplier
export const addSupplier = async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({
        status: false,
        message: "name and city are required fields",
      });
    }

    const { data, error } = await supabase
      .from("suppliers")
      .insert([{ name, city }])
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.message,
      });
    }

    return res.status(201).json({
      status: true,
      message: "Supplier created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};