import ListRow from "@shared/ListRow";
import { getCards } from "@/remote/card";
import { useInfiniteQuery } from "react-query";
import { useCallback } from "react";
import flatten from "lodash.flatten";
import InfiniteScroll from "react-infinite-scroll-component";
import Badge from "../shared/Badge";
import { useNavigate } from "react-router-dom";

export default function CardList() {
  const navigate = useNavigate();

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    "cards",
    ({ pageParam }) => {
      return getCards(pageParam);
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      },
      suspense: true,
    }
  );

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return;

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  console.log("card data", data);

  if (!data) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={[...new Array(10)].map((_, i) => (
          <ListRow.Skeleton key={i} />
        ))}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, idx) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${idx + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow
              onClick={() => navigate(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
