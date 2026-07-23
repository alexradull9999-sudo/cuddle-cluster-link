// Global helper to open the unified lead popup (name + phone only).
// Any component can call openLeadPopup("form_name") to trigger the modal.

export interface OpenLeadPopupOptions {
  formName: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

export const LEAD_POPUP_EVENT = "lovable:open-lead-popup";

export function openLeadPopup(
  formName: string,
  extra?: Omit<OpenLeadPopupOptions, "formName">
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<OpenLeadPopupOptions>(LEAD_POPUP_EVENT, {
      detail: { formName, ...extra },
    })
  );
}
