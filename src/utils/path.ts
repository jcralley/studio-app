export function getFileExtension(filePath: string): string | undefined {
  const parts = filePath.split('.');
  if (parts.length > 1) {
    return parts.pop();
  }
  return undefined;
}
