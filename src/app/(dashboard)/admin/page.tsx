import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import EventList from "@/components/events/EventList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/events");
  }

  const events = await db.event.findMany({
    orderBy: { date: "desc" },
    include: { user: true },
  });

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        <EventList events={events} userId={session.user.id} />
      </div>
    </div>
  );
}
