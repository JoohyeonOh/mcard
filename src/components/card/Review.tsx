import { useQuery } from "react-query";
import Skeleton from "../shared/Skeleton";
import Spacing from "../shared/Spacing";
import { useInView } from "react-intersection-observer";

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true, // 최초 한번만 동작
  });

  const { data = [], isLoading } = useQuery(
    ["review"],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(["너무 좋아요", "꼭 신청하세요 !!"]);
        }, 2_000);
      });
    },
    {
      enabled: inView,
    }
  );

  console.log(inView);

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton height={10} width={30} />
          <Spacing size={3} />
          <Skeleton height={10} width={30} />
        </>
      ) : (
        data.map((review, i) => <div key={i}>{review}</div>)
      )}
    </div>
  );
}

export default Review;
