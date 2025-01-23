"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteEvent } from "@/lib/actions/events";
import { formatDate } from "@/lib/utils/index";
import EventForm from "./EventForm"; // Import the EventForm

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
  };
  isOwner: boolean;
}

export default function EventCard({ event, isOwner }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteEvent(event.id);
    setIsDeleting(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
        {event.description}
      </p>
      <div className="mt-4 text-sm text-gray-500">
        📅 {formatDate(event.date)}
        <br />
        📍 {event.location}
      </div>
      {isOwner && (
        <div className="mt-4 flex space-x-2">
          {/* Edit Button */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              <EventForm event={event} onSuccess={handleEditSuccess} />
            </DialogContent>
          </Dialog>

          {/* Delete Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Event</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
