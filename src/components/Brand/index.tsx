import styles from './brand.module.scss';

interface BrandProps {
  tag: string
}

export function Brand({tag}: BrandProps) {
  return (
    <div className={styles['brand-container']}>
      <span>{tag}</span>
    </div>
  );
}
