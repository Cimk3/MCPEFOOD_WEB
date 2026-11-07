export function initReveal(): () => void
export function copyText(text: string): Promise<boolean>
export function scrollToId(id: string): void
export function scrollToTop(): void
export function observeSections(ids: string[], onActive: (id: string) => void): () => void
