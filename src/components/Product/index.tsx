
import { Brand } from '../Brand';

import style from './product.module.scss';

interface ProductProps {
  imgPath: string;
  title: string;
  subtile: string;
  price: number;
  tags: Array<string>;
}

export function Product({imgPath, title, subtile, tags,price}: ProductProps) {
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
        <div>
          <span>{price}</span>
        </div>
        <div>
          <div>
            <button>sub</button><span>1</span><button>add</button>
          </div>
          <div>
            <button>Add cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
