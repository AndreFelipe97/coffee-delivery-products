import { Product } from './components/Product';
import styles from './app.module.scss'
import { products } from './products';

function App() {
  return (
    <div className={styles["home-container"]}>
      <h1>Nossos café</h1>
      <div className={styles['product-container']}>
        {products.map(product => (
          <Product key={String(product.id)} imgPath={product.imagePath} title={product.title}  tags={product.tags} subtile={product.subtitle} price={product.price} />
        ))}
      </div>
    </div >
  );
}

export default App;
