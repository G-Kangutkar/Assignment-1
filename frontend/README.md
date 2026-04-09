# 🔍 Inventory Search API

## 📌 Overview

This API provides a flexible search functionality for an inventory system. It allows users to filter products based on name, category, and price range using query parameters.

---

## 🚀 Endpoint

```
GET /search
```

---

## 📥 Query Parameters

| Parameter  | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| `q`        | string | Search term for product name (partial, case-insensitive) |
| `category` | string | Exact category match (case-insensitive)                  |
| `minPrice` | number | Minimum price filter                                     |
| `maxPrice` | number | Maximum price filter                                     |

---

## ⚙️ Search Logic Explanation

The search functionality dynamically builds a query using Supabase based on the filters provided:

* **Name Search (`q`)**
  Uses case-insensitive partial matching (`ilike`) to find products containing the search term.

* **Category Filter (`category`)**
  Applies a case-insensitive exact match on the category field.

* **Price Range (`minPrice`, `maxPrice`)**

  * `minPrice` → filters products with price greater than or equal to the value
  * `maxPrice` → filters products with price less than or equal to the value

* **Sorting**
  Results are ordered by `id` in ascending order for consistency.

* **Dynamic Query Building**
  Filters are applied only if their corresponding query parameters are provided, making the API flexible and efficient.

---

## 📤 Sample Response

```json
{
  "status": true,
  "count": 2,
  "filters": {
    "q": "phone",
    "category": "electronics",
    "minPrice": "1000",
    "maxPrice": "5000"
  },
  "data": [
    {
      "id": 1,
      "name": "Smartphone",
      "category": "electronics",
      "price": 3000
    }
  ]
}
```

---

## ⚡ Performance Improvement (For Large Datasets)

For handling large datasets efficiently, one key improvement would be:

### ✅ **Add Database Indexing**

* Create indexes on frequently searched columns such as:

  * `name`
  * `category`
  * `price`

* This significantly speeds up filtering and search operations, especially for:

  * `ilike` queries on text fields
  * Range queries on numeric fields

### 🔥 Additional Enhancements (Optional)

* Implement **pagination** (`limit` & `offset`) to avoid returning large datasets at once
* Use **full-text search indexing** for faster and more advanced search capabilities
* Add **caching (e.g., Redis)** for frequently searched queries

---

## 🧠 Summary

This search API is:

* Flexible (dynamic filters)
* Scalable (can be optimized with indexing & pagination)
* User-friendly (supports partial and range-based filtering)

---
