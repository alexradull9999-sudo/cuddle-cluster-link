// Единая точка отправки заявок с сайта на вебхук Make.com
export const LEAD_WEBHOOK_URL =
  "https://hook.eu1.make.com/3sfaivquvopygp61itxesgx84w7b1udy";

/**
 * Отправить заявку на вебхук. Не бросает исключений — форма продолжает работу
 * даже при сетевой ошибке (юзер увидит success экран).
 *
 * @param formName Идентификатор формы (см. список в README/чате)
 * @param payload  Данные формы (произвольный JSON-объект)
 */
export async function sendLead(
  formName: string,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: formName,
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        ...payload,
      }),
      keepalive: true,
    });
  } catch (err) {
    console.error("[lead-webhook] failed:", err);
  }
}
