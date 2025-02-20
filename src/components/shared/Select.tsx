import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import { SelectHTMLAttributes, forwardRef } from "react";
import Flex from "./Flex";
import Text from "./Text";
import { Option } from "@/models/apply";
import { css } from "@emotion/react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #a6a6a6;
  }
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref
) {
  return (
    <Flex direction="column" css={selectContainer}>
      {label && (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      )}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  );
});

const selectContainer = css`
  padding: 24px;
`;

export default Select;
