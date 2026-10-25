// Reusable clipboard copy helper with callback support
export const copyText = async (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (e) {
      console.error('Clipboard copy error:', e)
    }
  }
  return false
}
