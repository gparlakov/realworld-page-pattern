export function stringIsEmpty(str: any): boolean
 {
  return str == null || typeof str === 'string' && str.trim() === '';
}

export function stringIsNotEmpty(str: any): boolean {
  return str != null && typeof str === 'string' && str.trim() !== '';
}
