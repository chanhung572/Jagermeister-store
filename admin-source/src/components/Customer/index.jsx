import React from 'react';

const Customer = () => {
  

  return (
    <div>
      <h2>Thông tin khách hàng</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Customer name</th>
            <th scope="col">Phone</th>
            <th scope="col">Total purchase</th> {/* xem chi tiet cac don hang da mua + bao nhieu lan se duoc tri an  */}
            <th scope="col">Status</th>
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
          <tr>
            <th scope="row">3</th>
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

export default Customer;