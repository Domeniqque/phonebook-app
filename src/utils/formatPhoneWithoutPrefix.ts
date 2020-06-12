const formatPhoneWithoutPrefix = (number: number): string => {
  const mask = 'XXXXX-XXXX';

  const s = String(number);
  let result = '';

  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    result += mask.charAt(im) === 'X' ? s.charAt(is++) : mask.charAt(im);
  }

  return result;
};

export default formatPhoneWithoutPrefix;
