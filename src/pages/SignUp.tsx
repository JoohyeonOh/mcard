import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import Form from "@/components/signup/Form";
import { FormValues } from "@/models/signup";
import { auth, store } from "@/remote/firebase";
import { COLLECTIONS } from "@/constants";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const onSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: name,
    });

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);
    // id를 지정하기 위해서는 doc(collection, id) 이렇게 두번째 인자에 id가 들어가면 된다.

    navigate("/");
  };

  return (
    <div>
      <Form onSubmit={onSubmit} />
    </div>
  );
}
