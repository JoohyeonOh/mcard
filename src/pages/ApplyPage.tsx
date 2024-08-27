import Apply from "@/components/apply";
import useAppliedCard from "@/components/apply/hooks/useAppliedCard";
import useApplyCardMutation from "@/components/apply/hooks/useApplyCardMutation";
import usePollApplyStatus from "@/components/apply/hooks/usePollApplyStatus";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useAlertContext } from "@/contexts/AlertContext";
import useUser from "@/hooks/auth/useUser";
import { APPLY_STATUS } from "@/models/apply";
import { updateApplyCard } from "@/remote/apply";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: "카드 심사를 준비하고 있습니다.",
  [APPLY_STATUS.PROGRESS]: "카드를 심사 중입니다. 잠시만 기다려주세요",
  [APPLY_STATUS.COMPLETE]: "카드 신청이 완료되었습니다.",
};

export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false);
  const user = useUser();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied === null) {
          return;
        }
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: "이미 발급이 완료된 카드입니다.",
            onButtonClick: () => window.history.back(),
          });

          return;
        }

        // 둘다 아니고 중간에 팬딩된 경우 곧바로 재심사 받을 수 있게 한다.
        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true,
    },
  });

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        applyValues: { status: APPLY_STATUS.COMPLETE },
        userId: user?.uid as string,
        cardId: id,
      });
      navigate("/apply/done?success=true", { replace: true });
    },
    onError: async () => {
      await updateApplyCard({
        applyValues: { status: APPLY_STATUS.REJECT },
        userId: user?.uid as string,
        cardId: id,
      });
      navigate("/apply/done?success=false", { replace: true });
    },
    enabled: readyToPoll,
  });

  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가 되었을 때 => 폴링 시작
      setReadyToPoll(true);
    },
    onError: () => {
      // 실패 했을 때
      window.history.back();
    },
  });

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (readyToPoll || isLoading) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? "READY"]} />;
  }

  return <Apply onSubmit={mutate} />;
}
