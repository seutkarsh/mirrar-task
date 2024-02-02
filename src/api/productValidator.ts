import { check, query } from "express-validator";

export const getProductValidator = [
  query("productId").exists().notEmpty().isAlphanumeric().isString(),
];

export const addProductValidator = [
  check("name", "Name is required").notEmpty().isString(),
  check("description", "Description is required").notEmpty().isString(),
  check("price", "Price is required and must be a number")
    .notEmpty()
    .isNumeric(),
  check("variants", "Variants cant be empty").notEmpty().isArray(),
  check("variants.*.sku", "SKU is required").notEmpty().isString(),
  check("variants.*.name", "Name is required").notEmpty().isString(),
  check(
    "variants.*.additionalCost",
    "Additional Cost is required and must be a number",
  )
    .notEmpty()
    .isNumeric(),
  check("variants.*.stockCount", "Stock Count is required and must be a number")
    .notEmpty()
    .isString(),
];

export const updateProductValidator = [
  check("productId").isMongoId().withMessage("Invalid productId"),
  check("name").optional().isString().withMessage("Name must be a string"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  check("price").optional().isNumeric().withMessage("Price must be a number"),

  check("variants")
    .optional()
    .isArray()
    .withMessage("Variants must be an array"),
  check("variants.*.sku")
    .optional()
    .isString()
    .withMessage("Variant SKU must be a string"),
  check("variants.*.name")
    .optional()
    .isString()
    .withMessage("Variant name must be a string"),
  check("variants.*.additionalCost")
    .optional()
    .isNumeric()
    .withMessage("Variant additionalCost must be a number"),
  check("variants.*.stockCount")
    .optional()
    .isNumeric()
    .withMessage("Variant stockCount must be a number"),
];

export const addVariantValidator = [
  check("productId").isMongoId().withMessage("Invalid productId"),

  check("variants").isArray().withMessage("Variants must be an array"),
  check("variants.*.sku")
    .isString()
    .withMessage("Variant SKU must be a string"),
  check("variants.*.name")
    .isString()
    .withMessage("Variant name must be a string"),
  check("variants.*.additionalCost")
    .isNumeric()
    .withMessage("Variant additionalCost must be a number"),
  check("variants.*.stockCount")
    .isNumeric()
    .withMessage("Variant stockCount must be a number"),
];

export const deleteVariantValidator = [
  check("productId").isMongoId().withMessage("Invalid productId"),
  check("skus").isArray().withMessage("skus must be an array"),
];
