import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, parentSlug } = req.body; // Accept parentSlug instead of parent ID
    let parent = null;

    // If a parent slug is provided, find its ID
    if (parentSlug) {
      const parentCategory = await Category.findOne({ slug: parentSlug });
      if (!parentCategory) {
        return res.status(400).json({ error: "Invalid parent category slug" });
      }
      parent = parentCategory._id;
    }

    const category = new Category({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"), // Generate slug automatically
      parent,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null }) // Fetch only main categories
      .populate({
        path: "parent",
        select: "name",
      })
      .lean();

    const result = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await Category.find({
          parent: category._id,
        }).lean();
        return { ...category, subcategories };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
