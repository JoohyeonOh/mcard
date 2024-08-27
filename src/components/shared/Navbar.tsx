import { Link, useLocation } from "react-router-dom";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";
import useUser from "@/hooks/auth/useUser";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/remote/firebase";
import MyImage from "../my/MyImage";

export default function Navbar() {
  const { pathname } = useLocation();
  const showSignButton = ["/signup", "/signin"].includes(pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user) {
      return (
        <Link to="/my">
          <MyImage />
        </Link>
      );
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 28px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
  z-index: 10;
`;
