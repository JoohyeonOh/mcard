import { css } from "@emotion/react";
import Button from "../shared/Button";
import Spacing from "../shared/Spacing";
import { ApplyValues } from "@/models/apply";
import { MouseEvent, useCallback, useState } from "react";
import FixedBottomButton from "../shared/FixedBottomButton";

type CardInfoValues = Pick<ApplyValues, "isMaster" | "isHipass" | "isRf">;

export default function CardInfo({
  onNext,
}: {
  onNext: (infoValues: CardInfoValues) => void;
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  });

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement;
    // console.log($button.name, $button.dataset.value);
    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
      // 데이터셋이 string으로 가기때문에 이걸 boolean으로 바꾸기 위해서 JSON.parse가 필요함
    }));
  }, []);

  return (
    <div css={cardInfoContainer}>
      <Button.Group title="해외 결제">
        <Button
          name="isMaster"
          weak={!cardInfoValues.isMaster}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={cardInfoValues.isMaster}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={20} />
      <Button.Group title="후불 교통">
        <Button
          name="isHipass"
          weak={cardInfoValues.isHipass}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={!cardInfoValues.isHipass}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={20} />
      <Button.Group title="후불하이패스카드">
        <Button
          name="isRf"
          weak={cardInfoValues.isRf}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={!cardInfoValues.isRf}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </div>
  );
}

const cardInfoContainer = css`
  padding: 24px;
`;
