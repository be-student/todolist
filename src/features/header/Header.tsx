import Link from "next/link";
import { HeaderBox } from "./HeaderComponents";

const HeaderButton = ({ children, to }) => {
  return <Link href={to}>{children}</Link>;
};
const Header = () => {
  return (
    <HeaderBox>
      <HeaderButton to="/">할 일</HeaderButton>
      <HeaderButton to="/created">생성일 순</HeaderButton>
      <HeaderButton to="/finished">마감일 순</HeaderButton>
      <HeaderButton to="/tags">태그</HeaderButton>
    </HeaderBox>
  );
};
export default Header;
