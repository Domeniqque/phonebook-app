export default function clearMaskedPhone(number: string): string {
  return number
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
    .replace(' ', '');
}
