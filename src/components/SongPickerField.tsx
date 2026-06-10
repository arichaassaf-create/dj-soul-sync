import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, X, Music, ExternalLink } from "lucide-react";
import type { WeddingSong } from "@/data/weddingSongs";

interface SongPickerFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  songs: WeddingSong[];
}

export function SongPickerField({ name, label, placeholder, songs }: SongPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<WeddingSong | null>(null);
  const [isOther, setIsOther] = useState(false);
  const [customText, setCustomText] = useState("");
  const [songLink, setSongLink] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const customRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = query
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : songs;

  const hasSelection = selected !== null || isOther;

  const displayLabel = selected
    ? `${selected.title} – ${selected.artist}`
    : isOther
    ? customText || "שיר אחר..."
    : placeholder || "בחרו שיר מהרשימה...";

  const hiddenValue = selected
    ? `${selected.title} – ${selected.artist}`
    : isOther
    ? customText
    : "";

  const youtubeSearchUrl = selected
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${selected.title} ${selected.artist}`)}`
    : null;

  function openDropdown() {
    setIsOpen(true);
    setQuery("");
    setTimeout(() => searchRef.current?.focus(), 40);
  }

  function closeDropdown() {
    setIsOpen(false);
    setQuery("");
  }

  function handleSelect(song: WeddingSong) {
    setSelected(song);
    setIsOther(false);
    setCustomText("");
    closeDropdown();
  }

  function handleSelectOther() {
    setSelected(null);
    setIsOther(true);
    closeDropdown();
    setTimeout(() => customRef.current?.focus(), 40);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    setSelected(null);
    setIsOther(false);
    setCustomText("");
    setSongLink("");
    setIsOpen(false);
  }

  return (
    <div className="space-y-2">
      {/* Hidden form inputs */}
      <input type="hidden" name={name} value={hiddenValue} />
      <input type="hidden" name={`${name}Link`} value={songLink} />

      <Label>{label}</Label>

      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={isOpen ? closeDropdown : openDropdown}
          className={`
            flex items-center w-full h-10 px-3 text-sm rounded-md border bg-background
            transition-colors text-right
            ${isOpen ? "border-primary ring-1 ring-primary/30" : "border-input hover:border-primary/40"}
            ${hasSelection ? "text-foreground" : "text-muted-foreground"}
          `}
        >
          <span className="flex-1 truncate text-right">{displayLabel}</span>
          <span className="flex items-center gap-1 shrink-0 mr-2">
            {hasSelection && (
              <span
                role="button"
                aria-label="נקה בחירה"
                onClick={handleClear}
                className="p-0.5 rounded hover:text-destructive transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-border/60">
              <Input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חפשו לפי שם שיר או זמר..."
                className="h-8 bg-background text-sm"
              />
            </div>

            {/* List */}
            <ul className="max-h-56 overflow-y-auto overscroll-contain" role="listbox">
              {filtered.length === 0 ? (
                <li className="px-3 py-5 text-sm text-muted-foreground text-center">
                  לא נמצאו שירים תואמים
                </li>
              ) : (
                filtered.map((song, i) => {
                  const isActive =
                    selected?.title === song.title && selected?.artist === song.artist;
                  return (
                    <li key={i} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => handleSelect(song)}
                        className={`
                          flex flex-col w-full px-3 py-2.5 text-right transition-colors
                          ${isActive ? "bg-primary/10" : "hover:bg-muted/50"}
                        `}
                      >
                        <span className={`text-sm font-medium leading-tight ${isActive ? "text-primary" : ""}`}>
                          {song.title}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">{song.artist}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Other option */}
            <div className="border-t border-border/60">
              <button
                type="button"
                onClick={handleSelectOther}
                className="flex items-center gap-2 w-full px-3 py-3 text-sm text-right text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                <Music className="h-4 w-4 shrink-0" />
                <span>שיר אחר שלא ברשימה...</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom text input */}
      {isOther && (
        <Input
          ref={customRef}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="שם השיר וזמר/ית..."
          className="bg-background"
          maxLength={200}
        />
      )}

      {/* Preview + link row */}
      {hasSelection && (
        <div className="flex items-center gap-2">
          {youtubeSearchUrl && (
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="חפשו את השיר ב-YouTube"
              className="inline-flex items-center gap-1.5 shrink-0 text-xs font-medium text-primary border border-primary/30 rounded-md px-2.5 py-1.5 hover:bg-primary/5 transition-colors"
            >
              {/* YouTube icon */}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              שמעו
            </a>
          )}
          <Input
            value={songLink}
            onChange={(e) => setSongLink(e.target.value)}
            placeholder="קישור לשיר – YouTube, Spotify, Apple Music... (אופציונלי)"
            className="bg-background text-xs h-8 flex-1"
            type="url"
            dir="ltr"
          />
        </div>
      )}
    </div>
  );
}
