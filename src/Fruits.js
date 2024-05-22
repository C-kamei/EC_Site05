import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fruits.css';

// フルーツ在庫情報を表示するコンポーネント
function Fruits({ auth }) {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchaseQuantities, setPurchaseQuantities] = useState({});
  const navigate = useNavigate();

  // フルーツ在庫情報を取得
  useEffect(() => {
    fetchFruitData();
  }, []);

  // フルーツ在庫情報を取得
  const fetchFruitData = () => {
    fetch('http://localhost:8080/fruits', {
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        // カートに追加されている商品の購入数を設定
        const newQuantities = {};
        cart.forEach(item => {
          newQuantities[item.id] = item.quantity;
        });
        setData(data);
        setPurchaseQuantities(newQuantities);
      })
      .catch(error => {
        console.error('Error fetching fruit data:', error);
        setData([]);
      });
  };

  // カートに商品を追加
  const addToCart = (fruit) => {
    const existingItem = cart.find(item => item.id === fruit.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setPurchaseQuantities({ ...purchaseQuantities, [fruit.id]: purchaseQuantities[fruit.id] + 1 });
    } else {
      setCart([...cart, { ...fruit, quantity: 1 }]);
      setPurchaseQuantities({ ...purchaseQuantities, [fruit.id]: 1 });
    }
  };

  // カートから商品を削除
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    const newQuantities = { ...purchaseQuantities };
    delete newQuantities[id];
    setPurchaseQuantities(newQuantities);
  };

  // カートの合計金額を計算
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // 購入確定ボタンがクリックされたときの処理
  const handlePurchase = () => {
    if (window.confirm("本当に購入しますか？")) {// 確認ダイアログを表示
      const purchaseRequests = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      // POSTリクエストを送信
      fetch('http://localhost:8080/fruits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify(purchaseRequests)
      })
      .then(response => response.text())
      .then(message => {
        navigate('/thank-you', { state: { cart, total: calculateTotal() } });
        setCart([]);
        setPurchaseQuantities({});
        fetchFruitData();
      })
      .catch(error => {
        console.error('Error purchasing fruits:', error);
      });
    }
  };

  // フルーツ在庫情報を表示
  return (
    <div>
      <h3>フルーツ在庫情報</h3>
      <table border="1">
        <thead>
          <tr>
            <th>商品コード</th>
            <th>商品名</th>
            <th>単価</th>
            <th>在庫数</th>
            <th>購入数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>
                <input 
                  type="number" 
                  value={purchaseQuantities[item.id] || 0} // 各商品の購入数を使用
                  onChange={(e) => setPurchaseQuantities({ ...purchaseQuantities, [item.id]: parseInt(e.target.value) || 0 })} 
                  min="1" 
                  max={item.stock} 
                />
              </td>
              <td><button onClick={() => addToCart(item)}>カートに追加</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>カート</h3>
      <table border="1">
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>購入数</th>
            <th>小計</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td><button onClick={() => removeFromCart(item.id)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>合計金額: {calculateTotal()}円</h3>
      <button onClick={handlePurchase}>購入確定</button>
    </div>
  );
}

export default Fruits;
