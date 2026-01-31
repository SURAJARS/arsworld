const Product = require('../models/Product');

// Public API - only returns enabled products
exports.getAllProducts = async (req, res) => {
  try {
    const { useCase, search } = req.query;
    let query = { isEnabled: true };

    if (useCase) {
      query.useCases = useCase;
    }

    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.ta': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.ta': { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin API - returns all products (enabled and disabled)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.ta': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.ta': { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByUseCase = async (req, res) => {
  try {
    const { useCase } = req.params;

    const products = await Product.find({
      useCases: useCase,
      isEnabled: true,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isPopular: true,
      isEnabled: true,
    }).limit(8);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, useCases, images, specifications } =
      req.body;

    console.log('📝 Create product request:', { name, description, price, useCases, images, specifications });

    if (!name || !description || !price || !images) {
      console.error('❌ Missing required fields');
      return res
        .status(400)
        .json({ message: 'Please provide all required fields: name, description, price, images' });
    }

    if (!name.en || !name.ta || !description.en || !description.ta) {
      console.error('❌ Missing language variants for name or description');
      return res
        .status(400)
        .json({ message: 'Name and description must have both EN and TA versions' });
    }

    if (Array.isArray(images) && images.length === 0) {
      console.error('❌ Images array is empty');
      return res
        .status(400)
        .json({ message: 'At least one image URL is required' });
    }

    console.log('✅ Validation passed, creating product...');

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      useCases: useCases || [],
      images: Array.isArray(images) ? images : [images],
      specifications: specifications || {},
    });

    console.log('✅ Product created successfully:', product._id);

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: error.message || 'Error creating product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, useCases, images, specifications, isPopular, isEnabled } =
      req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        useCases,
        images,
        specifications,
        isPopular,
        isEnabled,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.compareProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || productIds.length === 0 || productIds.length > 3) {
      return res
        .status(400)
        .json({ message: 'Please provide 1-3 product IDs' });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
