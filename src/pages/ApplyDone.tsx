import { parse } from "qs";

import Flex from "@/components/shared/Flex";
import Text from "@/components/shared/Text";
import { useSearchParams } from "react-router-dom";
import FixedBottomButton from "@/components/shared/FixedBottomButton";

export default function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Flex>
      <Text>
        {success === "true"
          ? "카드가 발급되었습니다."
          : "카드 발급에 실패했습니다."}{" "}
      </Text>
      <FixedBottomButton label="확인" onClick={() => window.history.back()} />
    </Flex>
  );
}
