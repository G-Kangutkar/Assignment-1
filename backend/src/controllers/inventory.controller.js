import supabase from "../config/supabase.config.js";


// POST /inventory
export const addInventory = async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    if (!supplier_id || !product_name || quantity === undefined || !price) {
      return res.status(400).json({
        status: false,
        message: "supplier_id, product_name, quantity and price are required fields",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        status: false,
        message: "quantity must be greater than or equal to 0",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        status: false,
        message: "price must be greater than 0",
      });
    }

    // Validate supplier exists before inserting
    const { data: supplier, error: supplierError } = await supabase
      .from("suppliers")
      .select("id")
      .eq("id", supplier_id)
      .single();

    if (supplierError || !supplier) {
      return res.status(404).json({
        status: false,
        message: `Supplier with id ${supplier_id} does not exist`,
      });
    }

    const { data, error } = await supabase
      .from("inventory")
      .insert([{ supplier_id, product_name, quantity, price }])
      .select();

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.message,
      });
    }

    return res.status(201).json({
      status: true,
      message: "Inventory item created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// GET /inventory
// Returns all inventory grouped by supplier, sorted by total value (quantity × price) DESC
export const getInventory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("supplier_inventory_summary")
      .select("*");

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      status: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};