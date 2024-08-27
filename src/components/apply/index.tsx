import BasicInfo from "@/components/apply/BasicInfo";
import CardInfo from "@/components/apply/CardInfo";
import Terms from "@/components/apply/Terms";
import useUser from "@/hooks/auth/useUser";

import { APPLY_STATUS, ApplyValues } from "@/models/apply";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../shared/ProgressBar";

const LAST_STEP = 3;

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void;
}) {
  const user = useUser();
  const { id } = useParams() as { id: string };

  const storageKey = `applied-${user?.uid}-${id}`;

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = window.localStorage.getItem(storageKey);

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      };
    }

    return JSON.parse(applied);
  });

  useEffect(() => {
    // const appliedData = window.localStorage.getItem(storageKey);
    // if (appliedData) {
    //   setApplyValues(JSON.parse(appliedData));
    // }

    if (applyValues.step === 3) {
      window.localStorage.removeItem(storageKey);

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues);
    } else {
      window.localStorage.setItem(storageKey, JSON.stringify(applyValues));
    }
  }, [applyValues, onSubmit, storageKey]);

  const handleTermsChange = (terms: ApplyValues["terms"]) => {
    console.log(terms);

    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }));
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, "salary" | "payDate" | "creditScore">
  ) => {
    console.log(infoValues);
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }));
  };

  const handleCardInfoChange = (
    infoValues: Pick<ApplyValues, "isMaster" | "isHipass" | "isRf">
  ) => {
    console.log(infoValues);
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }));
  };

  return (
    <div>
      <ProgressBar progress={Number(applyValues.step) / LAST_STEP} />
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  );
}
