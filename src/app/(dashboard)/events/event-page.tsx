"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEvents } from "@/lib/actions/events";
import EventFilters from "@/components/events/EventFilters";
import PageHeader from "@/components/ui/page-headers";
import Pagination from "@/components/events/Pagination";
import EventList from "@/components/events/EventList";

interface EventsPageProps {
  initialEvents: Awaited<ReturnType<typeof getEvents>>;
  userId: string;
}

export default function EventsPage({ initialEvents, userId }: EventsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState(initialEvents);
  const [isLoading, setIsLoading] = useState(false);

  // Extract search params with defaults
  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  // Fetch events with consistent parameters
  const fetchEvents = async (newPage: number) => {
    setIsLoading(true);
    try {
      const fetchedEvents = await getEvents({
        page: newPage,
        search,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      });
      setEvents(fetchedEvents);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setIsLoading(false);
    }
  };

  // Handler for filtering events
  const handleFilter = async (filters: {
    search: string;
    startDate: string;
    endDate: string;
  }) => {
    const params = new URLSearchParams({
      ...filters,
      page: "1",
    });

    router.push(`/events?${params.toString()}`);
    await fetchEvents(1);
  };

  // Handler for changing pages
  const handlePageChange = async (newPage: number) => {
    const params = new URLSearchParams({
      page: newPage.toString(),
      search,
      startDate,
      endDate,
    });

    router.push(`/events?${params.toString()}`);
    await fetchEvents(newPage);
  };

  // Refetch events when page loads or search params change
  useEffect(() => {
    fetchEvents(page);
  }, [page, search, startDate, endDate]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <PageHeader title="My Events" buttonLabel="Create Event" />
      <EventFilters
        initialFilters={{ search, startDate, endDate }}
        onFilter={handleFilter}
      />
      {isLoading ? (
        <div className="text-center">Loading events...</div>
      ) : events.events.length === 0 ? (
        <div className="text-center text-gray-500">No events found</div>
      ) : (
        <>
          <EventList events={events.events} userId={userId} />
          <Pagination
            currentPage={page}
            totalPages={events.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
