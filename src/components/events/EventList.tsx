"use client";

import EventCard from "./EventCard";
import { Event } from "@prisma/client";

interface EventListProps {
  events: Event[];
  userId: string;
}

export default function EventList({ events, userId }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isOwner={event.userId === userId}
        />
      ))}
    </div>
  );
}
