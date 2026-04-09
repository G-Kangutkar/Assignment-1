# 🗄️ Database Schema Documentation

## 📌 Overview

This database schema is designed to manage suppliers and their inventory efficiently. It follows a relational structure using SQL, ensuring data integrity, scalability, and optimized querying.

---

## 🧱 Schema Structure

### 1️⃣ Suppliers Table

Stores supplier details.

```sql
CREATE TABLE suppliers (
  id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name  TEXT NOT NULL,
  city  TEXT NOT NULL
);
```

**Fields:**

* `id` → Unique supplier identifier (Primary Key)
* `name` → Supplier name
* `city` → Supplier location

---

### 2️⃣ Inventory Table

Stores product inventory linked to suppliers.

```sql
CREATE TABLE inventory (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  supplier_id  BIGINT NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity     INTEGER NOT NULL DEFAULT 0,
  price        NUMERIC(12, 2) NOT NULL,

  CONSTRAINT quantity_non_negative CHECK (quantity >= 0),
  CONSTRAINT price_positive        CHECK (price > 0)
);
```

**Fields:**

* `id` → Unique product identifier
* `supplier_id` → Foreign key linking to suppliers
* `product_name` → Name of the product
* `quantity` → Available stock (non-negative)
* `price` → Product price (must be positive)

**Key Features:**

* Referential integrity via foreign key
* Automatic deletion of inventory when supplier is deleted (`ON DELETE CASCADE`)
* Data validation using constraints

---

### 3️⃣ Indexing

```sql
CREATE INDEX idx_inventory_supplier_id ON inventory(supplier_id);
```

* Improves performance for joins and lookups based on `supplier_id`
* Essential for queries involving supplier-inventory relationships

---

### 4️⃣ Aggregated View

```sql
CREATE VIEW supplier_inventory_summary AS
SELECT
  s.id                              AS supplier_id,
  s.name                            AS supplier_name,
  s.city                            AS supplier_city,
  COUNT(i.id)                       AS total_products,
  COALESCE(SUM(i.quantity), 0)      AS total_quantity,
  COALESCE(SUM(i.quantity * i.price), 0) AS total_inventory_value,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'id',           i.id,
      'product_name', i.product_name,
      'quantity',     i.quantity,
      'price',        i.price,
      'value',        i.quantity * i.price
    )
    ORDER BY i.product_name
  ) FILTER (WHERE i.id IS NOT NULL) AS items
FROM suppliers s
LEFT JOIN inventory i ON i.supplier_id = s.id
GROUP BY s.id, s.name, s.city
ORDER BY total_inventory_value DESC NULLS LAST;
```

**Purpose:**

* Provides a summarized view of inventory grouped by supplier
* Includes:

  * Total products
  * Total quantity
  * Total inventory value
  * Nested product details (JSON format)

---

## 🧠 Why SQL (Relational Database)?

SQL was chosen over NoSQL for the following reasons:

### ✅ Structured Relationships

* Clear relationship between `suppliers` and `inventory`
* Enforced using foreign keys

### ✅ Data Integrity

* Constraints ensure valid data (e.g., non-negative quantity, positive price)

### ✅ Complex Queries

* Efficient aggregation using `GROUP BY`, `SUM`, and joins
* Ability to create views for reusable query logic

### ✅ Consistency

* ACID compliance ensures reliable transactions

👉 A NoSQL database would be less suitable here because:

* Relationships would need to be handled manually
* Aggregations and joins are less efficient

---

## ⚡ Optimization Suggestion

### ✅ Composite Index for Search & Filtering

To further improve performance, especially for search and filtering:

```sql
CREATE INDEX idx_inventory_search 
ON inventory (supplier_id, product_name, price);
```

**Benefits:**

* Faster filtering by supplier
* Improved performance for product name searches
* Optimized range queries on price

---

## 🚀 Summary

This schema provides:

* Strong relational design with enforced integrity
* Efficient querying through indexing and views
* Scalable structure for inventory management systems

---
