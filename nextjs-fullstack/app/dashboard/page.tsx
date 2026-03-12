"use client";
import { useSession } from "next-auth/react";
import { ReservationList } from "@/components/reservations/ReservationList";
import { DashboardStats } from "@/components/DashboardStats";
export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
      <DashboardStats />
      <ReservationList />
    </div>
  );
}
