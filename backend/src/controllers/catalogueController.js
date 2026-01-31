const Catalogue = require('../models/Catalogue');

// Get all catalogues
exports.getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Catalogues retrieved successfully',
      catalogues,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalogues', error: error.message });
  }
};

// Get catalogues by category
exports.getCataloguesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const catalogues = await Catalogue.find({ category, isActive: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Catalogues retrieved successfully',
      catalogues,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalogues', error: error.message });
  }
};

// Get single catalogue
exports.getCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogue = await Catalogue.findById(id);
    
    if (!catalogue) {
      return res.status(404).json({ message: 'Catalogue not found' });
    }

    // Increment views
    catalogue.views += 1;
    await catalogue.save();

    res.json({
      success: true,
      message: 'Catalogue retrieved successfully',
      catalogue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalogue', error: error.message });
  }
};

// Create catalogue (admin only)
exports.createCatalogue = async (req, res) => {
  try {
    const { title, description, category, url, fileName, thumbnail } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newCatalogue = await Catalogue.create({
      title,
      description,
      category,
      url,
      fileName,
      thumbnail,
    });

    res.status(201).json({
      success: true,
      message: 'Catalogue created successfully',
      catalogue: newCatalogue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating catalogue', error: error.message });
  }
};

// Update catalogue (admin only)
exports.updateCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, url, fileName, thumbnail, isActive } = req.body;

    let catalogue = await Catalogue.findById(id);
    if (!catalogue) {
      return res.status(404).json({ message: 'Catalogue not found' });
    }

    catalogue = await Catalogue.findByIdAndUpdate(
      id,
      { title, description, category, url, fileName, thumbnail, isActive },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Catalogue updated successfully',
      catalogue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating catalogue', error: error.message });
  }
};

// Delete catalogue (admin only)
exports.deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogue = await Catalogue.findByIdAndDelete(id);

    if (!catalogue) {
      return res.status(404).json({ message: 'Catalogue not found' });
    }

    res.json({
      success: true,
      message: 'Catalogue deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catalogue', error: error.message });
  }
};

// Get catalogue statistics
exports.getCatalogueStats = async (req, res) => {
  try {
    const totalCatalogues = await Catalogue.countDocuments();
    const totalViews = await Catalogue.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);

    const byCategory = await Catalogue.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalCatalogues,
        totalViews: totalViews[0]?.totalViews || 0,
        byCategory,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};
