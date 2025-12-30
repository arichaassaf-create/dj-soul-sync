import { useState, useEffect } from "react";
import { Accessibility, Plus, Minus, RotateCcw, X, Eye, Type, Moon, Sun, MousePointer, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  invertColors: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  highlightLinks: false,
  bigCursor: false,
  invertColors: false,
};

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    applySettings(settings);
  }, []);

  const applySettings = (s: AccessibilitySettings) => {
    document.documentElement.style.fontSize = `${s.fontSize}%`;
    
    document.body.classList.toggle("high-contrast", s.highContrast);
    document.body.classList.toggle("highlight-links", s.highlightLinks);
    document.body.classList.toggle("big-cursor", s.bigCursor);
    document.body.classList.toggle("invert-colors", s.invertColors);
  };

  const increaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.min(prev.fontSize + 10, 150) }));
  };

  const decreaseFontSize = () => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(prev.fontSize - 10, 80) }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleHighlightLinks = () => {
    setSettings(prev => ({ ...prev, highlightLinks: !prev.highlightLinks }));
  };

  const toggleBigCursor = () => {
    setSettings(prev => ({ ...prev, bigCursor: !prev.bigCursor }));
  };

  const toggleInvertColors = () => {
    setSettings(prev => ({ ...prev, invertColors: !prev.invertColors }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <Accessibility className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-20 left-4 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
          role="dialog"
          aria-label="תפריט נגישות"
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              <span className="font-bold">תפריט נגישות</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label="סגור תפריט נגישות"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Type className="w-4 h-4" />
                גודל טקסט: {settings.fontSize}%
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 80}
                  className="flex-1"
                >
                  <Minus className="w-4 h-4 ml-1" />
                  הקטן
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 150}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 ml-1" />
                  הגדל
                </Button>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-2">
              <button
                onClick={toggleHighContrast}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  settings.highContrast 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "border-border hover:bg-muted"
                }`}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">ניגודיות גבוהה</span>
              </button>

              <button
                onClick={toggleHighlightLinks}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  settings.highlightLinks 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "border-border hover:bg-muted"
                }`}
              >
                <Link2 className="w-5 h-5" />
                <span className="text-sm font-medium">הדגשת קישורים</span>
              </button>

              <button
                onClick={toggleBigCursor}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  settings.bigCursor 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "border-border hover:bg-muted"
                }`}
              >
                <MousePointer className="w-5 h-5" />
                <span className="text-sm font-medium">סמן מוגדל</span>
              </button>

              <button
                onClick={toggleInvertColors}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  settings.invertColors 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "border-border hover:bg-muted"
                }`}
              >
                {settings.invertColors ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="text-sm font-medium">היפוך צבעים</span>
              </button>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={resetSettings}
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              איפוס הגדרות
            </Button>

            {/* Link to Accessibility Statement */}
            <Link
              to="/accessibility"
              className="block text-center text-sm text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              הצהרת נגישות מלאה
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
