export default function trim(number: string): string {
  return number.replace(/(\s|-|\+|\(|\))/g, '');
}
