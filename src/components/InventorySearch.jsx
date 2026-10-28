import { Search, X } from 'lucide-react';
import { useRef } from 'react';

export default function InventorySearch({ value, onChange }) {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-row gap-2 sm:gap-3"
    >
      <label htmlFor="inventory-search" className="sr-only">
        Search inventory
      </label>
      <div className="relative flex-1">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          ref={inputRef}
          id="inventory-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search make, model or stock ID"
          autoComplete="off"
          enterKeyHint="search"
          className="w-full min-h-[48px] rounded-xl border border-subtle bg-card py-3 pl-11 pr-11 text-sm text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-action [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 flex min-h-[40px] min-w-[40px] -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-accent-hover/15 hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        type="submit"
        aria-label="Search"
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-action px-3 sm:px-6 py-3 text-sm font-semibold text-onaction transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2"
      >
        <Search size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
