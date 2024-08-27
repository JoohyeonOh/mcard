import { userAtom } from "@/atom/user";
import { useRecoilValue } from "recoil";

export default function useUser() {
  const user = useRecoilValue(userAtom);
  return user;
}
