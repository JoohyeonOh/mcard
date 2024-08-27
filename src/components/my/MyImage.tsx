import { userAtom } from "@/atom/user";
import { COLLECTIONS } from "@/constants";
import useUser from "@/hooks/auth/useUser";
import { app, storage, store } from "@/remote/firebase";
import styled from "@emotion/styled";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

export default function MyImage({
  size = 40,
  mode = "default",
}: {
  size?: number;
  mode?: "default" | "upload";
}) {
  const user = useUser();
  const setUser = useSetRecoilState(userAtom);

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const currentUser = getAuth(app).currentUser;

    if (!files || !user || !currentUser) {
      return;
    }

    const fileName = files[0].name;
    const storageRef = ref(storage, `/users/${user.uid}/${fileName}`);

    const uploaded = await uploadBytes(storageRef, files[0]);
    const downloadUrl = await getDownloadURL(uploaded.ref);

    // auth 업데이트
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    });

    // fire-store DB 업데이트
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoUrl: downloadUrl,
    });

    // 리코일 전역상태 업데이트
    setUser({
      ...user,
      photoUrl: downloadUrl,
    });
  };

  return (
    <Container>
      <img
        src={
          user?.photoUrl ||
          "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
        }
        alt="유저 이미지"
        width={size}
        height={size}
      />
      {mode === "upload" ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
