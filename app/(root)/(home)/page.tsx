"use client"

import React, { useState, useEffect } from "react"
import MeetingTypeList from "@/components/MeetingTypeList"
import { useGetCalls } from "@/hooks/useGetCalls"

import Link from "next/link"

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { upcomingCalls } = useGetCalls()

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)

    return function cleanup() {
      clearInterval(timerID)
    }
  })

  function tick() {
    setCurrentTime(new Date())
  }

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    currentTime
  )

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <Link href="/upcoming">
            <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
              Upcoming Meetings: {""}
              {upcomingCalls?.length === 0 ? "-" : upcomingCalls?.length}
            </h2>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
