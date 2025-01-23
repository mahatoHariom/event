import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import EventForm from "@/components/events/EventForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const event = await db.event.findUnique({
    where: { id: params.id },
  });

  if (!event) {
    notFound();
  }

  // Check if user is authorized to edit this event
  if (
    !session.user ||
    (event.userId !== session.user.id && session.user.role !== "ADMIN")
  ) {
    redirect("/events");
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Edit Event</h1>
      <EventForm event={event} />
    </div>
  );
}
