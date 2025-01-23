import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EventForm from "@/components/events/EventForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreateEventPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Create New Event</h1>
      <EventForm />
    </div>
  );
}
