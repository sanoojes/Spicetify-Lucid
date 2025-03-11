export function extractUrl(input: string): string | null {
  const match = input.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : null;
}
