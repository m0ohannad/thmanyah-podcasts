export function normalizeSearchTerm(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}
