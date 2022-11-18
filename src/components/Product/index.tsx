import { useState } from "react";
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

import { Brand } from '../Brand';

import style from './product.module.scss';

interface ProductProps {
  imgPath: string;
  title: string;
  subtile: string;
  price: number;
  tags: Array<string>;
}

interface ProductsAddCart {
  title: string;
  imgPath: string;
  price: number;
  amount: number;
}

export function Product({imgPath, title, subtile, tags,price}: ProductProps) {
  const [amount, setAmount] = useState<number>(0);
  const [products, setProducts] = useState<Array<ProductsAddCart>>([])

  function addAmount() {
    setAmount(state => state + 1)
  }

  function minusAmount() {
    setAmount(state => state > 0 ? state - 1 : state)
  }

  function addCart() {
    if (amount > 0) {
      setProducts([...products, {
        title, imgPath, price, amount
      }]);

      const newProducts = JSON.stringify(products);

      if(localStorage.getItem("@COFFEE_DELIVERY_PRODUCTS")) {
        console.log('Entrou aqui!')
        const oldProducts = JSON.parse(
          String(localStorage.getItem("@COFFEE_DELIVERY_PRODUCTS"))
        );

        oldProducts.push(newProducts);

        localStorage.setItem(
          "@COFFEE_DELIVERY_PRODUCTS",
          oldProducts
        );
        console.log(localStorage.getItem("@COFFEE_DELIVERY_PRODUCTS"));
      } else {
        localStorage.setItem(
          "@COFFEE_DELIVERY_PRODUCTS",
          newProducts
        )
      }
    }
  }

  return (
    <div className={style['product-container']}>
      <img src={imgPath} alt="" />
      <div className={style['brand-container']}>
        {tags.map(tag => (
          <Brand key={tag} tag={tag}/>
        ))}
      </div>
      <h1 className={style['title-product']}>{title}</h1>
      <p className={style['subtitle-product']}>{subtile}</p>
      <div className={style['footer']}>
        <div className={style['price']}>
          <span>R$ {price}</span>
        </div>
        <div className={style['cart-itens-container']}>
          <div className={style['amount']}>
            <button
              type="button"
              onClick={minusAmount}
            >
              <FiMinus />
            </button>
              <span>{amount}</span>
            <button
              type="button"
              onClick={addAmount}
            >
              <FiPlus />
            </button>
          </div>
          <button
            type="button"
            onClick={addCart}
            className={style['add-cart']}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
