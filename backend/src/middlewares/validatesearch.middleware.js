// Validates and sanitizes GET /search query parameters before hitting the controller

export const validateSearchQuery = (req, res, next) => {
  const { minPrice, maxPrice } = req.query;

  if (minPrice !== undefined && minPrice !== "") {
    const parsed = parseFloat(minPrice);
    if (isNaN(parsed) || parsed < 0) {
      return res.status(400).json({
        status: false,
        message: "minPrice must be a non-negative number",
      });
    }
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    const parsed = parseFloat(maxPrice);
    if (isNaN(parsed) || parsed < 0) {
      return res.status(400).json({
        status: false,
        message: "maxPrice must be a non-negative number",
      });
    }
  }

  if (minPrice && maxPrice) {
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      return res.status(400).json({
        status: false,
        message: "minPrice cannot be greater than maxPrice",
      });
    }
  }

  next();
};