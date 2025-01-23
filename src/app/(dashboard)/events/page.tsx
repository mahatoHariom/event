import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getEvents } from "@/lib/actions/events";
import EventsPage from "./event-page";

export default async function EventsLayout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const startDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate")!)
    : undefined;
  const endDate = searchParams.get("endDate")
    ? new Date(searchParams.get("endDate")!)
    : undefined;

  const events = await getEvents({
    page,
    search,
    startDate,
    endDate,
  });

  return <EventsPage initialEvents={events} userId={session.user.id} />;
}
