export interface Mask {
  /** The input mask */
  mask: string;

  /** The regex patterns for specific characters */
  patterns?: { [character: string]: { pattern: RegExp; optional?: boolean } };

  /**
   * Any additional characters that should be considered special
   */
  specialCharacters?: string[];

  /**
   * Drop special characters from the input value
   */
  dropSpecialCharacters?: boolean;

  /**
   * For numeric fields, allow negative numbers
   */
  allowNegative?: boolean;

  /**
   * The mask prefix
   */
  prefix?: string;

  /**
   * The mask suffix
   */
  suffix?: string;

  /**
   * The error message to display if invalid
   */
  errorMessage?: string;
}

/**
 * Mask for a phone number
 * i.e. ###-###-####
 */
export const PhoneNumberMask: Mask = {
  mask: '#00-000-0000',
  patterns: {
    '#': { pattern: /[2-9]/ },
    0: { pattern: /[0-9]/ },
  },
  errorMessage: 'Phone number must be formatted as ###-###-####',
};

/**
 * Different variant using periods instead of dashes
 * i.e. ###.###.####
 */
export const PhoneNumber2Mask: Mask = {
  mask: '#00.000.0000',
  patterns: {
    '#': { pattern: /[2-9]/ },
    0: { pattern: /[0-9]/ },
  },
};

/**
 * Different variant using parentheses around the area code
 * i.e. (###) ###-####
 */
export const PhoneNumber3Mask: Mask = {
  mask: '(#00) 000-0000',
  patterns: {
    '#': { pattern: /[2-9]/ },
    0: { pattern: /[0-9]/ },
  },
};

/**
 * Mask for a zip code
 * i.e. ##### OR #####-####
 */
export const ZipCodeMask: Mask = {
  mask: '00000|00000-0000',
};

/**
 * Mask for a whole number
 * i.e. ####
 */
export const WholeNumberMask: Mask = {
  mask: '0*',
  patterns: {
    0: { pattern: /[0-9]/ },
  },
};

/**
 * Decimal number that supports two decimal places
 * i.e. ###.##
 */
export const DecimalNumberMask: Mask = Object.freeze({
  mask: '0*.00',
  patterns: {
    0: { pattern: /^(0|[1-9]d*)(.d+)?$/ },
  },
});

export class Masks {
  static from(mask: Mask, overrides?: Partial<Mask>) {
    return {
      ...mask,
      ...overrides,
    };
  }
}
