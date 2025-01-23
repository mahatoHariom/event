"use client";
import { SortField, SortOrder } from "@/lib/actions/events";

interface EventSortProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField, order: SortOrder) => void;
}

export default function EventSort({
  sortField,
  sortOrder,
  onSort,
}: EventSortProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <select
        value={sortField}
        onChange={(e) => onSort(e.target.value as SortField, sortOrder)}
        className="rounded-md border-gray-300"
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="location">Location</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onSort(sortField, e.target.value as SortOrder)}
        className="rounded-md border-gray-300"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
