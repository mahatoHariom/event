"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { format } from "date-fns";

interface EventFiltersProps {
  initialFilters: {
    search: string;
    startDate: string;
    endDate: string;
  };
  onFilter: (filters: {
    search: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export default function EventFilters({
  initialFilters,
  onFilter,
}: EventFiltersProps) {
  const [search, setSearch] = useState(initialFilters.search);
  const [startDate, setStartDate] = useState(initialFilters.startDate);
  const [endDate, setEndDate] = useState(initialFilters.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ search, startDate, endDate });
  };

  const handleClear = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    onFilter({ search: "", startDate: "", endDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear Filters
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
}
