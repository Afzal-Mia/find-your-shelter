"use client";

import { Search, Building2, BadgeCheck } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface PropertyFilters {
    search: string;
    type: string;
    status: string;
}

interface SearchFiltersProps {
    filters: PropertyFilters;
    onChange: (filters: PropertyFilters) => void;
}

export default function SearchFilters({
    filters,
    onChange,
}: SearchFiltersProps) {
    return (
        <section className="rounded-3xl border bg-card p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="flex flex-1 items-center gap-3 border-b pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                        <Search className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Search
                        </p>

                        <Input
                            placeholder="Property title..."
                            value={filters.search}
                            onChange={(e) =>
                                onChange({
                                    ...filters,
                                    search: e.target.value,
                                })
                            }
                            className="h-auto border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
                        />
                    </div>
                </div>

                {/* Type */}
                <div className="flex items-center gap-3 border-b pb-4 lg:w-64 lg:border-b-0 lg:border-r lg:pb-0 lg:px-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                        <Building2 className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Property Type
                        </p>

                        <Select
                            value={filters.type}
                            onValueChange={(value) =>
                                onChange({
                                    ...filters,
                                    type: value,
                                })
                            }
                        >
                            <SelectTrigger className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="flat">Flat</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 lg:w-64 lg:px-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                        <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Status
                        </p>

                        <Select
                            value={filters.status}
                            onValueChange={(value) =>
                                onChange({
                                    ...filters,
                                    status: value,
                                })
                            }
                        >
                            <SelectTrigger className="h-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="partially_booked">
                                    Partially Booked
                                </SelectItem>
                                <SelectItem value="fully_booked">
                                    Fully Booked
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </section>
    );
}