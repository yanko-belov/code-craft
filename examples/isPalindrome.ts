export function isPalindrome(str: string): boolean {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (normalized.length <= 1) return true;
  
  let left = 0;
  let right = normalized.length - 1;
  
  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

export const isPalindromeOneLiner = (str: string): boolean => {
  const n = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return n === [...n].reverse().join('');
};
