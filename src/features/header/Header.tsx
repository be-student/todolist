import { HeaderButton } from "../../components/Button";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.headerBox}>
      <HeaderButton to="/">할 일</HeaderButton>
      <HeaderButton to="/created">생성일 순</HeaderButton>
      <HeaderButton to="/finished">마감일 순</HeaderButton>
      <HeaderButton to="/tags">태그</HeaderButton>
    </div>
  );
};
export default Header;
