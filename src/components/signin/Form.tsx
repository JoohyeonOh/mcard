import { css } from "@emotion/react";
import FixedBottomButton from "../shared/FixedBottomButton";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import TextField from "../shared/TextField";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Button from "../shared/Button";
import { Link } from "react-router-dom";
import Text from "../shared/Text";
import { colors } from "@/styles/colorPalette";
import { FormValues } from "@/models/signin";
import validator, { isAlpha } from "validator";

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void;
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [dirty, setDirty] = useState<Partial<FormValues>>({});

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleDirty = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [event.target.name]: "true",
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const isAble = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainer}>
      <TextField
        label="이메일"
        name="email"
        onChange={handleChange}
        value={formValues.email}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={dirty.email && errors.email}
        onBlur={handleDirty}
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
        onBlur={handleDirty}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        onClick={() => onSubmit(formValues)}
        disabled={!isAble}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7" textAlign="center">
          아직 계정이 없으신가요?
        </Text>
      </Link>
    </Flex>
  );
}

const formContainer = css`
  padding: 30px 28px;
`;

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`;

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = "이메일 형식을 확인해주세요";
  }

  if (formValues.password.length < 8) {
    errors.password = "비밀번호는 8글자 이상 입력해주세요.";
  }

  return errors;
}
