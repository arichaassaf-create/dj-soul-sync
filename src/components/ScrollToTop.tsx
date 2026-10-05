import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Page views are counted by GA4 itself (initial load + Enhanced measurement history events),
// so no manual page_view here, otherwise every page would be counted twice.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
