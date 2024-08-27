import { css } from "@emotion/react";
import Flex from "./Flex";
import Text from "./Text";
import { colors } from "@/styles/colorPalette";
import { MouseEvent } from "react";

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  );
}

function AgreementTitle({
  children,
  checked,
  onToggle,
}: {
  children: React.ReactNode;
  checked: boolean;
  onToggle: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
}) {
  return (
    <Flex as="li" align="center" onClick={(e) => onToggle(e, !checked)}>
      <IconCheckBox checked={checked} />
      <Text bold typography="t5">
        {children}
      </Text>
    </Flex>
  );
}

function AgreementDescription({
  children,
  checked,
  onToggle,
  link,
}: {
  children: React.ReactNode;
  checked: boolean;
  onToggle: (e: MouseEvent<HTMLElement>, checked: boolean) => void;
  link?: string;
}) {
  return (
    <Flex as="li" align="center" justify="space-between">
      <Flex align="center" onClick={(e) => onToggle(e, !checked)}>
        <IconCheckBox checked={checked} isCircle={false} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      )}
    </Flex>
  );
}

Agreement.Title = AgreementTitle;
Agreement.Description = AgreementDescription;

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`;

const IconCheckBox = ({
  checked,
  isCircle = true,
}: {
  checked: boolean;
  isCircle?: boolean;
}) => {
  return (
    <svg
      data-name="Livello 1"
      id="Livello_1"
      viewBox="0 0 128 128"
      height={24}
      width={24}
    >
      <title />
      {isCircle && (
        <path
          fill={checked ? colors.blue : colors.gray}
          d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"
        />
      )}
      <path
        fill={checked ? colors.blue : colors.gray}
        d="M87.9,42.36,50.42,79.22,40.17,68.43a3,3,0,0,0-4.35,4.13l12.35,13a3,3,0,0,0,2.12.93h.05a3,3,0,0,0,2.1-.86l39.65-39a3,3,0,1,0-4.21-4.28Z"
      />
    </svg>
  );
};

export default Agreement;
