import { css } from "@emotion/react";
import FixedBottomButton from "@shared/FixedBottomButton";
import Flex from "@shared/Flex";
import TextField from "@shared/TextField";
import Spacing from "@shared/Spacing";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FormValues } from "@/models/signup";
import validator from "validator";

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void;
}) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const [dirty, setDirty] = useState<Partial<FormValues>>({});

  const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [event.target.name]: "true",
    }));
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  console.log(errors);

  const isAble = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainer}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abc@abc.net"
        onChange={handleChange}
        value={formValues.email}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={dirty.email && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        onChange={handleChange}
        value={formValues.password}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={dirty.password && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        onChange={handleChange}
        value={formValues.passwordConfirm}
        hasError={
          Boolean(dirty.passwordConfirm) && Boolean(errors.passwordConfirm)
        }
        helpMessage={dirty.passwordConfirm && errors.passwordConfirm}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="에이든"
        onChange={handleChange}
        value={formValues.name}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={dirty.name && errors.name}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={!isAble}
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

const formContainer = css`
  padding: 30px 28px;
`;

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = "이메일 형식을 확인해주세요";
  }

  if (formValues.password.length < 8) {
    errors.password = "비밀번호는 8글자 이상 입력해주세요.";
  }

  if (formValues.passwordConfirm.length < 8) {
    errors.passwordConfirm = "비밀번호는 8글자 이상 입력해주세요.";
  } else if (
    validator.equals(formValues.password, formValues.passwordConfirm) === false
  ) {
    errors.passwordConfirm = "비밀번호를 확인해주세요.";
  }

  if (formValues.name.length < 2) {
    errors.name = "이름은 2글자 이상 입력해주세요";
  }

  return errors;
}
