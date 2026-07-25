export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export function showToast(message: string, variant: ToastVariant = 'info') {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent('geeky-toast', {
      detail: { message, variant },
    })
  );
}
