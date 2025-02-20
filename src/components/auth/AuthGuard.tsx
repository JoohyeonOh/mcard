import { auth } from "@remote/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { userAtom } from "@/atom/user";
import { useSetRecoilState } from "recoil";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    console.log("user", user);

    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoUrl: user.photoURL ?? "",
      });
    } else {
      setUser(null);
    }
    setInitialize(true);
  });

  if (!initialize) return <></>;

  return <>{children}</>;
}
