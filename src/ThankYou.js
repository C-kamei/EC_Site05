import React from 'react';
import { useLocation } from 'react-router-dom';

function ThankYou() {
  const { state } = useLocation();
  const { cart, total } = state || { cart: [], total: 0 };

  const handleGoBack = () => {
    window.history.back(); // ブラウザの戻る機能を使用して前の画面に戻る
  };

  return (
    <div>
      <h2>購入ありがとうございます。</h2>
      <h3>購入した商品:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>購入数</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>合計金額: {total}円</h3>
      <button onClick={handleGoBack}>戻る</button>
    </div>
  );
}

export default ThankYou;
