
"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { useAppStore, Project } from "@/store/useAppStore";
import History from "./ProjectsHistory";
import { formatDistanceToNow } from "date-fns";
import { CiSearch } from "react-icons/ci";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { MdDownloadForOffline } from "react-icons/md";

const COST_PER_QUESTION = 1000;
const TIME_PER_QUESTION = 2;
const PAGE_SIZE = 6;

export default function ViewHistory() {
  const projects = useAppStore((state) => state.projects);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "inProgress">(
    "all"
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter + Search
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (filter === "completed") return p.completed;
        if (filter === "inProgress") return !p.completed;
        return true;
      })
      .filter((p) => {
        const term = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(term) ||
          (p.description?.toLowerCase().includes(term) ?? false)
        );
      });
  }, [projects, filter, search]);

  // Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, filteredProjects.length)
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [filteredProjects.length]
  );

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  // CSV Download
  const downloadCSV = () => {
    const headers = [
      "Project Name",
      "Status",
      "Questions Count",
      "Estimated Cost",
      "Estimated Time",
      "Last Updated",
    ];
    const rows = filteredProjects.map((p) => [
      p.name,
      p.completed ? "Completed" : "In Progress",
      p.mainQuizAnswers.length,
      (p.mainQuizAnswers.length * COST_PER_QUESTION).toLocaleString(),
      p.mainQuizAnswers.length * TIME_PER_QUESTION + " hrs",
      p.updatedAt
        ? formatDistanceToNow(new Date(p.updatedAt), { addSuffix: true })
        : "",
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "projects_history.csv");
    link.click();
  };

  return (
    <div className="px-2 sm:px-6 py-8 space-y-6">
      {/* Header + Search + Filters + CSV */}
      <h1 className="text-3xl font-bold pl-2">Project History</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-20 pl-2">
        <div className="flex flex-row sm:items-center gap-2 w-full sm:w-auto">
          {/* Search Input */}
          <div className="lg:w-72 h-12 flex items-center border border-gray-300 rounded-lg focus-within:border-1  focus-within:border-blue-500 pl-2">
            <CiSearch className="size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or description..."
              className="w-full sm:w-64 px-4 py-2 outline-none bg-transparent"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            />
          </div>

          {/* Custom Select Filter */}
          <div className="w-48">
            <CustomSelect
              options={["all", "completed", "inProgress"]}
              value={filter}
              onChange={(val) => {
                setFilter(val as "all" | "completed" | "inProgress");
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Filter Projects"
              name=""
            />
          </div>

          {/* CSV Download */}
          <button
            onClick={downloadCSV}
            className="rounded-full hover:shadow-lg mt-2 sm:mt-0"
            title="Download CSV"
          >
            <MdDownloadForOffline className="size-8" />
          </button>
        </div>
      </div>
      <hr />

      {/* Projects Grid */}
      {visibleProjects.length === 0 ? (
        <div className="text-center text-gray-500 py-10 pl-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <p>No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-2">
          {visibleProjects.map((p: Project) => {
            const estimatedCost =
              (p.mainQuizAnswers?.length || 0) * COST_PER_QUESTION;
            const estimatedTime =
              (p.mainQuizAnswers?.length || 0) * TIME_PER_QUESTION;
            const lastUpdated = p.updatedAt
              ? formatDistanceToNow(new Date(p.updatedAt), { addSuffix: true })
              : undefined;

            return (
              <History
                key={p.id}
                id={p.id}
                name={p.name}
                completed={p.completed || false}
                description={p.description}
                questionsCount={p.mainQuizAnswers.length}
                estimatedCost={estimatedCost}
                estimatedTime={estimatedTime}
                lastUpdated={lastUpdated}
              />
            );
          })}
        </div>
      )}

      {/* Sentinel برای Infinite Scroll */}
      {visibleCount < filteredProjects.length && (
        <div ref={loadMoreRef} className="h-1"></div>
      )}
    </div>
  );
}
