"use client";

import {useQuery} from "@tanstack/react-query";
import {Hashtag} from "@/model/Hashtag";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import Trend from "@/app/(afterLogin)/_component/Trend";

export default function TrendSection () {
    const {data} = useQuery<Hashtag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale time
        gcTime: 300 * 1000,
    });

    return data?.map((trend) => <Trend key={trend.tagId} trend={trend}/>)
}
