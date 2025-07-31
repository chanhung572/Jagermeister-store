import React, { useState, useEffect } from 'react';

const Product = () => {
  const [formData, setFormData] = useState({
    name: '', unit: '', category: '', price: '', status: '', image: ''
  });

  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/products/get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Status ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    setProducts(data);
  } catch (error) {
    console.error('Lỗi khi load sản phẩm:', error.message);
  }
};

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.status === 201) {
        alert(result.message);
        setFormData({ name: '', unit: '', category: '', price: '', status: '', image: '' });
        fetchProducts();
      } else {
        alert('Lỗi: ' + result.message);
      }
    } catch (error) {
      console.error('Lỗi gửi dữ liệu:', error);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return alert('Chọn sản phẩm cần xóa');
    try {
      const res = await fetch('http://localhost:3000/api/products/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ids: selectedIds })
      });
      const result = await res.json();
      alert(result.message);
      setSelectedIds([]);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  const handleEditChange = (id, field, value) => {
    setEditedProducts(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSaveEdited = async () => {
    for (const id of selectedIds) {
      const edited = editedProducts[id];
      if (edited) {
        await handleUpdateProduct(id, edited);
      }
    }
    setEditedProducts({});
    setSelectedIds([]);
  };

  const handleUpdateProduct = async (id, updatedFields) => {
    try {
      const res = await fetch('http://localhost:3000/api/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id, ...updatedFields })
      });
      const result = await res.json();
      alert(result.message);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
    }
  };

  const getDiscountedPrice = (price, discount) => {
    const p = parseFloat(price);
    return discount > 0 ? p - (p * discount / 100) : p;
  };

  const getUnitsByCategory = (category) => {
    switch (category) {
      case 'wine': return ['20ML', '700ML', '1000ML'];
      case 'accessories': return ['1 vòi'];
      default: return [];
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Thông tin sản phẩm</h2>

      {/* Form nhập liệu */}
      <div className="row g-3 mb-4 text">
        <div className="col-md-4">
          <input type="text" name="name" className="form-control" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <select name="unit" className="form-select" value={formData.unit} onChange={handleChange} disabled={!formData.category}>
            <option value="">Chọn đơn vị</option>
            {getUnitsByCategory(formData.category).map((u, idx) => (
              <option key={idx} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
            <option value="">Chọn danh mục</option>
            <option value="wine">Rượu</option>
            <option value="accessories">Phụ kiện</option>
          </select>
        </div>

        <div className="col-md-4">
          <input type="text" name="price" className="form-control" placeholder="Giá (VNĐ)" value={formData.price} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
            <option value="">Trạng thái</option>
            <option value="active">Còn hàng</option>
            <option value="inactive">Ngừng bán</option>
            <option value="sold out">Hết hàng</option>
          </select>
        </div>

        <div className="col-md-4">
          <input type="text" name="image" className="form-control" placeholder="URL ảnh" value={formData.image} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button onClick={handleSubmit} className="btn btn-primary">Thêm sản phẩm</button>
        </div>
      </div>

      {/* Bảng hiển thị sản phẩm */}
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Chọn</th>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Đơn vị</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Giảm(%)</th>
            <th>Giá sau giảm</th>
            <th>Trạng thái</th>
            <th>Ảnh</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {products.map((p, index) => (
            <tr key={p._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p._id)}
                  onChange={() => toggleSelect(p._id)}
                />
              </td>
              <th>{index + 1}</th>
              <td>
                {selectedIds.includes(p._id) ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedProducts[p._id]?.name ?? p.name}
                    onChange={(e) => handleEditChange(p._id, 'name', e.target.value)}
                  />
                ) : (
                  p.name
                )}
              </td>

              <td>
                <select
                  value={p.unit}
                  className="form-select"
                  onChange={(e) => handleUpdateProduct(p._id, { unit: e.target.value })}
                  disabled={!p.category}
                >
                    <option value="">---------</option>
                  {getUnitsByCategory(p.category).map((u, idx) => (
                    <option key={idx} value={u}>{u}</option>
                  ))}
                </select>
              </td>

              <td>
                <select
                  value={p.category}
                  className="form-select"
                  onChange={(e) => handleUpdateProduct(p._id, { category: e.target.value })}
                >
                  <option value="">---------</option>
                  <option value="wine">Rượu</option>
                  <option value="accessories">Phụ kiện</option>
                </select>
              </td>

              <td>
                {selectedIds.includes(p._id) ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedProducts[p._id]?.price ?? p.price}
                    onChange={(e) => handleEditChange(p._id, 'price', e.target.value)}
                  />
                ) : (
                  (editedProducts[p._id]?.price ?? p.price).toLocaleString() + '₫'
                )}
              </td>

              <td className="align-middle text-center">
                <input
                  type="number"
                  className="form-control form-control-sm mx-auto"
                  style={{ width: '80px', textAlign: 'center' }}
                  value={editedProducts[p._id]?.discount ?? p.discount ?? 0}
                  min={0}
                  onChange={(e) => handleEditChange(p._id, 'discount', e.target.value)}
                />
              </td>
              
              <td>
                {getDiscountedPrice(
                  editedProducts[p._id]?.price ?? p.price,
                  editedProducts[p._id]?.discount ?? p.discount ?? 0
                ).toLocaleString()}₫
              </td>

              <td>
                <select
                  value={p.status}
                  className="form-select"
                  onChange={(e) => handleUpdateProduct(p._id, { status: e.target.value })}
                >
                  <option value="">---------</option>
                  <option value="active">Còn hàng</option>
                  <option value="inactive">Ngừng bán</option>
                  <option value="sold out">Hết hàng</option>
                </select>
              </td>

              <td>
                {p.image ? <img src={p.image} alt="ảnh sản phẩm" width="50" /> : 'Không có'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIds.length > 0 && (
        <>
          <button className="btn btn-danger mt-3 me-2" onClick={handleDelete}>
            🗑 Xóa ({selectedIds.length})
          </button>
          <button className="btn btn-success mt-3" onClick={handleSaveEdited}>
            💾 Lưu ({selectedIds.length})
          </button>
        </>
      )}
    </div>
  );
};

export default Product;