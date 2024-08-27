import { ChangeEvent, useCallback, useState } from "react";
import Select from "../shared/Select";

import { 연소득옵션, 신용점수옵션, 결제일옵션 } from "@/constants/apply";
import { ApplyValues } from "@/models/apply";
import Flex from "../shared/Flex";
import FixedBottomButton from "../shared/FixedBottomButton";

type InfoValues = Pick<ApplyValues, "salary" | "creditScore" | "payDate">;

export default function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void;
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: "",
    creditScore: "",
    payDate: "",
  });

  const handleInfoChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInfoValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value
  );

  return (
    <Flex direction="column">
      <Select
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
        name="salary"
      />
      <Select
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
        name="creditScore"
      />
      <Select
        label="결제일옵션"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
        name="payDate"
      />
      <FixedBottomButton
        label="다음으로"
        onClick={() => onNext(infoValues)}
        disabled={!모든정보가선택되었는가}
      />
    </Flex>
  );
}
