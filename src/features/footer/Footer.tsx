import { useState } from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  const checkBox = () => {
    setCheck((prev) => !prev);
  };
  const [check, setCheck] = useState<boolean>(false);
  return (
    <div className={styles.footerBox}>
      <div>
        완료된 일만 보기
        <input onChange={checkBox} checked={check} type="checkbox"></input>
      </div>
    </div>
  );
};
export default Footer;
