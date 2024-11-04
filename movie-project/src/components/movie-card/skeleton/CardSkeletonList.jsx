import React from "react"
import { CardSkeleton } from "./CardSkeleton"


export const CardSkeletonList = ({number}) => {
  return (
    Array.from({ length: number }).map((_, index) => (
      <CardSkeleton key={index} />
    ))
  )
}