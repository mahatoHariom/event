/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db } from "@/lib/db";
import { eventSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

export async function createEvent(data: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const validatedFields = eventSchema.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    date: data.get("date"),
    location: data.get("location"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await db.event.create({
      data: {
        ...validatedFields.data,
        userId: session.user.id,
      },
    });

    revalidatePath("/events");
    return { success: true };
  } catch {
    return { error: "Failed to create event" };
  }
}

export type SortField = "date" | "title" | "location";
export type SortOrder = "asc" | "desc";

interface GetEventsParams {
  page?: number;
  limit?: number;
  sortField?: SortField;
  sortOrder?: SortOrder;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

export async function getEvents({
  page = 1,
  limit = 9,
  sortField = "date",
  sortOrder = "asc",
  search = "",
  startDate,
  endDate,
}: GetEventsParams = {}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const skip = (page - 1) * limit;

  try {
    const where = {
      AND: [
        session.user.role === "ADMIN" ? {} : { userId: session.user.id },
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  location: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
        startDate ? { date: { gte: startDate } } : {},
        endDate ? { date: { lte: endDate } } : {},
      ],
    };

    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      }),
      db.event.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      events,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch events");
  }
}

export async function updateEvent(id: string, data: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const validatedFields = eventSchema.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    date: data.get("date"),
    location: data.get("location"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const event = await db.event.findUnique({
      where: { id },
    });

    if (
      !event ||
      (event.userId !== session.user.id && session.user.role !== "ADMIN")
    ) {
      throw new Error("Not authorized");
    }

    await db.event.update({
      where: { id },
      data: validatedFields.data,
    });

    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update event" };
  }
}

export async function deleteEvent(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  try {
    const event = await db.event.findUnique({
      where: { id },
    });

    if (
      !event ||
      (event.userId !== session.user.id && session.user.role !== "ADMIN")
    ) {
      throw new Error("Not authorized");
    }

    await db.event.delete({
      where: { id },
    });

    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete event" };
  }
}
