import { css } from "@emotion/react";
import Flex from "./Flex";
import Text from "./Text";
import Skeleton from "./Skeleton";
import Spacing from "./Spacing";

interface ListRowProps {
  left?: React.ReactNode;
  contents: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: "li" | "div";
}

export default function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = "li",
}: ListRowProps) {
  return (
    <Flex as={as} css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex css={listRowRightStyles}>{right}</Flex>
      {withArrow && <IconArrowRight />}
    </Flex>
  );
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;
const listRowContentsStyles = css`
  flex: 1;
`;

const listRowRightStyles = css``;

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode;
  subTitle: React.ReactNode;
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}

function ListRowSkeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={4} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  );
}

function IconArrowRight() {
  return (
    <svg height={20} id="Layer_1" viewBox="0 0 512 512" width={20}>
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  );
}

ListRow.Texts = ListRowTexts;
ListRow.Skeleton = ListRowSkeleton;
