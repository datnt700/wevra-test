/**
 * Get user initials from name
 * @param name - User's full name
 * @returns Initials (e.g., "JD" for "John Doe")
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return 'QN';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'QN';
  if (parts.length === 1) {
    const part = parts[0];
    return part ? part.substring(0, 2).toUpperCase() : 'QN';
  }
  const first = parts[0]?.[0];
  const last = parts[parts.length - 1]?.[0];
  return first && last ? (first + last).toUpperCase() : 'QN';
}
