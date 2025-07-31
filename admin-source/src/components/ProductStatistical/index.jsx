import React from 'react';

const ProductStatistical = () => {
    return (
        <div>
            <h2>Thống kê hàng nhập và tồn kho</h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng nhập</th>
                    <th scope="col">Số lượng tồn kho</th>
                    <th scope="col">Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <h2>Tổng doanh thu</h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng đã bán</th>
                    <th scope="col">Giá nhập</th>
                    <th scope="col">Giá bán</th> 
                    <th scope="col">Lãi</th>
                    <th scope="col">Lỗ</th>
                    <th scope="col">Chi phí khác</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductStatistical;