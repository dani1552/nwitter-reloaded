import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
    <h2>layout</h2>
      <Outlet />
    </>
  );
}

//코드에 문제있느것같음 니꼬처럼 화면이 안나오고 흰화면 나옴
//코드 이해 필요 -> 동작방식 이해하기