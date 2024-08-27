import Form from "@/components/signin/Form";
import { FormValues } from "@/models/signin";
import { auth } from "@/remote/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { useAlertContext } from "@/contexts/AlertContext";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        if (
          error instanceof FirebaseError &&
          error.code === "auth/wrong-password"
        ) {
          open({
            title: "계정의 정보를 다시 확인해주세요",
            onButtonClick: () => {},
          });

          return;
        }

        open({
          title: "잠시 후 다시 시도해주세요.",
          onButtonClick: () => {},
        });
      }
    },
    [open]
  );

  return (
    <div>
      <Form onSubmit={onSubmit} />
    </div>
  );
}
