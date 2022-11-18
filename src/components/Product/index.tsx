/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

import { Brand } from '../Brand';

import style from './product.module.scss';

interface ProductProps {
  id: number;
  imgPath: string;
  title: string;
  subtile: string;
  price: number;
  tags: Array<string>;
}

interface ProductsAddCart {
  id: number;
  title: string;
  imgPath: string;
  price: number;
  amount: number;
}

export function Product({id, imgPath, title, subtile, tags,price}: ProductProps) {
  const [amount, setAmount] = useState<number>(0);
  const [priceFormat, setPriceFormat] = useState<string>('')

  useEffect(() => {
    const items = localStorage.getItem("@CART") ? JSON.parse(String(localStorage.getItem("@CART"))) : null;
    if (items) {
      const productInitial = items.findIndex((prod: ProductsAddCart) => prod.id === id);
      console.log(productInitial)
      if(productInitial !== -1){
        console.log(productInitial)
        setAmount(items[productInitial].amount)
      } else {
        setAmount(0)
      };
    }

    let numberFormat = new Intl.NumberFormat(
      'pt-BR', { style: 'currency', currency: 'BRL' })
      .format(price)
    setPriceFormat(numberFormat)
  }, [])

  function addAmount() {
    setAmount(state => state + 1)
  }

  function minusAmount() {
    setAmount(state => state > 0 ? state - 1 : state)
  }

  function addCart() {
    const product = {
      id, title, imgPath, price, amount
    }

    const cart = localStorage.getItem("@CART") ? JSON.parse(String(localStorage.getItem("@CART"))) : [];

    const indexProduct = cart.findIndex((prod: ProductsAddCart) => prod.id === id);

    if(indexProduct > -1) {
      cart[indexProduct] = product;
    } else {
      cart.push(product)
    }
    
    localStorage.setItem("@CART", JSON.stringify(cart))
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
          <span>{priceFormat}</span>
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
