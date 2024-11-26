import { CardSkeleton } from "./CardSkeleton"


export const CardSkeletonList = ({number}: {number:number}) => {
  return (
    Array.from({ length: number }).map((_, index) => (
      <CardSkeleton key={index} />
    ))
  )
}