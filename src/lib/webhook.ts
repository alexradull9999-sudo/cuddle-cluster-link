// Единая точка отправки заявок с сайта на вебхук Make.com
export const LEAD_WEBHOOK_URL =
  "https://hook.eu1.make.com/3sfaivquvopygp61itxesgx84w7b1udy";

/** Идентификатор счётчика Яндекс.Метрики */
const YANDEX_METRIKA_ID = 110783984;

/** Идентификатор единой цели на отправку любой формы-заявки */
export const UNIFIED_LEAD_GOAL = "lead_submit";

/**
 * Зафиксировать достижение цели в Яндекс.Метрике.
 * Работает только в браузере и не бросает исключений.
 */
export function reachYandexGoal(goalName: string): void {
  if (typeof window === "undefined") return;
  try {
    const ym = (window as unknown as Record<string, unknown>).ym as
      | ((counterId: number, method: "reachGoal", goal: string) => void)
      | undefined;
    if (typeof ym === "function") {
      ym(YANDEX_METRIKA_ID, "reachGoal", goalName);
    }
  } catch (err) {
    console.error("[yandex-goal] failed:", err);
  }
}

/**
 * Отправить заявку на вебхук. Не бросает исключений — форма продолжает работать
 * даже при сетевой ошибке (юзер увидит success экран).
 *
 * @param formName Идентификатор формы (см. список в README/чате)
 * @param payload  Данные формы (произвольный JSON-объект)
 */
export async function sendLead(
  formName: string,
  payload: Record<string, unknown>,
): Promise<void> {
  // Единая цель на любую заявку — фиксируем до отправки, чтобы не потерять
  reachYandexGoal(UNIFIED_LEAD_GOAL);

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
