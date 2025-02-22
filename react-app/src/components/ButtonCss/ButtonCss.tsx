import styles from './ButtonCss.module.css';

const ButtonCss = () => {
  return (
    <button className={[styles.btn,styles['btn-primary']].join(' ')}>My Button</button>
  )
}

export default ButtonCss