const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },             // Tên sản phẩm
  unit: { type: String, default: '' },               // Đơn vị (ml, cái, kg, v.v.)
  category: { type: String },                               // Loại
  price: { type: Number, required: true },      // Giá sản phẩm
  discount: { type: Number, default: 0 },           // Giảm giá (nếu có)
  discountedPrice: { type: Number, default: 0 },                // Giá sau khi giảm
  status: { type: String, default: '' },              // Trạng thái (active, inactive, sold out, etc.)
  image: { type: String },                                  // Đường dẫn ảnh
  description: { type: String },                            // Mô tả
});

module.exports = mongoose.model('Product', productSchema);