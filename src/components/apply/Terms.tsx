import { useCallback, useState } from "react";
import Agreement from "../shared/Agreement";
import Spacing from "../shared/Spacing";
import { 약관목록 } from "@/constants/apply";
import { MouseEvent } from "react";
import FixedBottomButton from "../shared/FixedBottomButton";
import { ApplyValues } from "@/models/apply";

export default function Terms({
  onNext,
}: {
  onNext: (terms: ApplyValues["terms"]) => void;
}) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {}
    );
  });

  const handleAllAgreements = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prev) => {
        return Object.keys(prev).reduce<Record<string, boolean>>(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {}
        );
      });
    },
    []
  );

  const agreedAll = Object.values(termsAgreements).every((agree) => agree);

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={agreedAll} onToggle={handleAllAgreements}>
          약관에 모두 동의
        </Agreement.Title>
        <Spacing size={8} />
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onToggle={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!agreedAll}
        onClick={() => onNext(Object.keys(termsAgreements))}
      />
    </div>
  );
}
