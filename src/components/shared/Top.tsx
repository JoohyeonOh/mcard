import { css } from "@emotion/react";

import Flex from "./Flex";
import Text from "./Text";

interface TopProps {
  title: string;
  subTitle: string;
}

export default function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text typography="t4" bold>
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
`;
