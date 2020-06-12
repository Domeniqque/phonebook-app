import formatPhoneWithoutPrefix from './formatPhoneWithoutPrefix';

const generatePhoneSequence = (
  startSequenceMasked: string,
  qtdSequence: number,
): string[] => {
  const sequence = [];

  const [prefix, number] = startSequenceMasked.split(' ');
  const firstNumber = Number(number.replace('-', ''));

  for (let index = 0; index < qtdSequence; index++) {
    const createdNumber = formatPhoneWithoutPrefix(firstNumber + index);

    sequence.push(`${prefix} ${createdNumber}`);
  }

  return sequence;
};

export default generatePhoneSequence;
