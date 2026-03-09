/**
 * שולח טופס ל-Netlify Forms — שיטה פשוטה שלא מצריכה API keys.
 * Netlify מקבל את הנתונים ושולח מייל ל-arichaassaf@gmail.com אוטומטית.
 */
export async function sendFormEmail(
  formName: "contact" | "wedding" | "workshop",
  data: Record<string, string | undefined>
): Promise<void> {
  try {
    // בנה את הנתונים בפורמט שNetlify מצפה לו
    const formData = new URLSearchParams();
    formData.append("form-name", formName);

    // הוסף את כל השדות שאינם ריקים
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        formData.append(key, value);
      }
    });

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
  } catch (err) {
    // Silent fail — המייל הוא משני לWhatsApp
    if (import.meta.env.DEV) {
      console.error("Netlify form submission error:", err);
    }
  }
}
