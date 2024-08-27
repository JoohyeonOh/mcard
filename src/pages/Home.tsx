import Top from "@/components/shared/Top";
import { Suspense } from "react";
import AdBanners from "@/components/home/AdBanners";
import ListRow from "@/components/shared/ListRow";
import CardList from "@/components/home/CardList";

export default function HomePage() {
  //   useEffect(() => {
  //     getCards().then((res) => console.log("RESPONSE", res));
  //     getAdBanners().then((res) => console.log("RESPONSE", res));
  //   }, []);

  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, i) => (
          <ListRow.Skeleton key={i} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  );
}
