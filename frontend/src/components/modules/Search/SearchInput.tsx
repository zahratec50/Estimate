"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import clsx from "clsx";

interface SearchInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ isOpen, onClose, onSubmit }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on ESC or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "bg-white dark:bg-secondary-800 border border-gray-300 rounded-full p-2 w-64 transition-all"
      )}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <IoSearchOutline className="w-5 h-5 text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700 dark:text-white"
        />
      </form>
    </div>
  );
};

export default SearchInput;
