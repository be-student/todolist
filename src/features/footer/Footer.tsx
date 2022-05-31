import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  checkComplete,
  checkNotComplete,
  deleteCompletedTask,
  selectComplete,
  selectNotComplete,
} from "../redux/taskSlice";
import { FooterBox, FooterButton, FooterItem } from "./FooterComponents";

const Footer = () => {
  const dispatch = useAppDispatch();
  const complete = useAppSelector(selectComplete);
  const notComplete = useAppSelector(selectNotComplete);
  return (
    <FooterBox>
      <FooterItem>
        미완 보기
        <input
          onChange={() => {
            dispatch(checkNotComplete());
          }}
          checked={notComplete}
          type="checkbox"
        ></input>
      </FooterItem>
      <FooterItem>
        완료 보기
        <input
          onChange={() => {
            dispatch(checkComplete());
          }}
          checked={complete}
          type="checkbox"
        ></input>
      </FooterItem>
      <FooterButton
        onClick={() => {
          dispatch(deleteCompletedTask());
        }}
      >
        제거 완료
      </FooterButton>
    </FooterBox>
  );
};
export default Footer;
