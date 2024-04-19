const ZERO = "0";

export const compressZeros = (formattedValue: string): string => {
  console.log(formattedValue);
  // Find the punctuation symbol marking the start of the decimal part
  const punctuationSymbol = formattedValue.match(/[.,]/g)?.pop();

  // If no punctuation symbol found or no zeros after it, return the original value
  if (
    !punctuationSymbol ||
    !formattedValue.includes("0", formattedValue.indexOf(punctuationSymbol))
  ) {
    return formattedValue;
  }

  // Find the index of the punctuation symbol
  const punctIdx = formattedValue.lastIndexOf(punctuationSymbol);

  // Extract characters after the punctuation symbol
  const charsAfterPunct = formattedValue.slice(punctIdx + 1).split("");

  if (charsAfterPunct.length <= 2) return formattedValue;

  // Count consecutive zeros
  const zeros = charsAfterPunct.filter((char) => char === ZERO);
  const otherDigits = charsAfterPunct.filter((char) => char !== ZERO);

  const canDisplayZeros = zeros.length !== 0 || otherDigits.length !== 0;
  const zerosCount = `0_${zeros.length - 1}_`;

  const compressedValue = `${formattedValue.substring(0, punctIdx + 1)}${
    canDisplayZeros ? zerosCount : ""
  }${otherDigits.join("")}`;

  return compressedValue;
};
