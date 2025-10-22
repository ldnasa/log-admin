/**
 * Converter objeto de PascalCase para camelCase
 */
export function toCamelCase<T>(obj: any): T {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as any;
  }

  const converted: any = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      converted[camelKey] = toCamelCase(obj[key]);
    }
  }

  return converted;
}

/**
 * Converter objeto de camelCase para PascalCase
 */
export function toPascalCase<T>(obj: any): T {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toPascalCase(item)) as any;
  }

  const converted: any = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      converted[pascalKey] = toPascalCase(obj[key]);
    }
  }

  return converted;
}