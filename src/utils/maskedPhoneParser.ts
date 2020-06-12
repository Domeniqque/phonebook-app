interface MaskedResponse {
  areaCode: string;
  sulfixNumber: number;
}

const maskedPhoneParser = (numberMasked: string): MaskedResponse => {
  const [areaCode, rawSulfixNumber] = numberMasked.split(' ');
  const sulfixNumber = Number(rawSulfixNumber.replace('-', ''));

  return { areaCode, sulfixNumber };
};

export default maskedPhoneParser;
