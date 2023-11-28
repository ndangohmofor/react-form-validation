import Skeleton from "react-loading-skeleton";

function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="left-col">
        <Skeleton circle={true} height={200} width={200} />
      </div>
      <div className="right-col">
        <Skeleton count={3} />
        <Skeleton count={3} />
        <Skeleton count={3} />
      </div>
    </div>
  );
}

export default CardSkeleton;
