import { APPLY_STATUS } from "@/models/apply";
import { useQuery } from "react-query";

interface usePollApplyStatusProps {
  onSuccess: () => void;
  onError: () => void;
  enabled: boolean;
}

export default function usePollApplyStatus({
  onSuccess,
  onError,
  enabled,
}: usePollApplyStatusProps) {
  return useQuery(["applyStatus"], () => getApplyStatus(), {
    enabled: enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status) => {
      if (status === APPLY_STATUS.COMPLETE) {
        onSuccess();
      }
    },
    onError: () => {
      onError();
    },
  });
}

// 카드 발급 여부 목킹 함수
function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error("카드 발급에 실패했습니다.");
  }

  return status;
}
