export interface MomFeelings {
  sensationDescr: string;
  states: string[];
}

export interface Mom {
  _id: string;
  weekNumber: number;
  feelings: MomFeelings;
  comfortTips: {
    category: string;
    tip: string;
  }[];
}
