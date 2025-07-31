const Product = require('../models/products');
const ActionLog = require('../models/actionlog');

// Hàm tính giá sau khi áp dụng giảm giá
const calculateDiscountedPrice = (price, discount) => {
  const p = parseFloat(price);
  const d = parseFloat(discount);
  return d > 0 ? p - (p * d / 100) : p;
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: 'Tên và giá sản phẩm là bắt buộc' });
  }

  try {
    const {
      name, unit, category, price, status, image, description = '', discount = 0
    } = req.body;

    const discountedPrice = calculateDiscountedPrice(price, discount);

    const newProduct = new Product({
      name,
      unit,
      category,
      price: parseFloat(price),
      discount: parseFloat(discount),
      discountedPrice,
      status,
      image,
      description
    });

    await newProduct.save();

    await ActionLog.create({
      user: req.admin?.username || 'unknown',
      message: `đã thêm sản phẩm ${newProduct.name}`,
      action: 'Thêm sản phẩm'
    });

    res.status(201).json({ message: 'Sản phẩm đã được thêm thành công', product: newProduct });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    res.status(500).json({ message: 'Không thể thêm sản phẩm', error });
  }
};

// Xóa nhiều sản phẩm
exports.deleteProducts = async (req, res) => {
  const { ids } = req.body;
  try {
    await Product.deleteMany({ _id: { $in: ids } });

    await ActionLog.create({
      user: req.admin?.username || 'unknown',
      message: `đã xóa ${ids.length} sản phẩm`,
      action: 'Xóa sản phẩm'
    });

    res.status(200).json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const { id, name, price, status, unit, category, discount, image, description } = req.body;

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (discount !== undefined) updateData.discount = parseFloat(discount);
    if (status) updateData.status = status;
    if (unit) updateData.unit = unit;
    if (category) updateData.category = category;
    if (image) updateData.image = image;
    if (description) updateData.description = description;

    if (price !== undefined || discount !== undefined) {
      const existingProduct = await Product.findById(id);
      const finalPrice = price !== undefined ? parseFloat(price) : existingProduct.price;
      const finalDiscount = discount !== undefined ? parseFloat(discount) : existingProduct.discount;
      updateData.discountedPrice = calculateDiscountedPrice(finalPrice, finalDiscount);
    }

    await Product.findByIdAndUpdate(id, updateData);

    await ActionLog.create({
      user: req.admin?.username || 'unknown',
      message: `đã cập nhật sản phẩm ${name || id}`,
      action: 'Cập nhật sản phẩm'
    });

    res.status(200).json({ message: 'Cập nhật sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
  }
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error });
  }
};