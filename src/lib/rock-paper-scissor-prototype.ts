// THIS IS FOR TESTING THE LOGIC OF WIN PERCENTAGE AND ITS FEATURE

export type IItem = {
  strengths: string[];
  weaknesses: string[];
  name: string;
};

export type output = {
  totalNumPlayed: number;
  totalNumWins: number;
  totalNumLoss: number;
  totalNumTies: number;
  winPercentage: number;
};

export const picker = <A extends string, B extends IItem[]>(
  selected: A,
  items: B
) => {
  let record = {
    totalNumPlayed: 0,
    totalNumWins: 0,
    totalNumLoss: 0,
    totalNumTies: 0,
    winPercentage: 0,
  };

  if (selected === "random") {
    const randomItem = Math.floor(Math.random() * items.length);
    for (let i = 1; i < 10; i++) {
      const move = Math.floor(Math.random() * items.length);
      const isWeak = items[move].strengths.find(
        (x: string) => x === items[randomItem].name.toLowerCase()
      );
      const isStrengths = items[move].weaknesses.find(
        (y: string) => y === items[randomItem].name.toLowerCase()
      );
      if (isStrengths) {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumWins + 1,
        };
      } else if (isWeak) {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumLoss + 1,
        };
      } else {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumTies + 1,
        };
      }
    }
  } else {
    for (let i = 1; i < 10; i++) {
      const move = Math.floor(Math.random() * items.length);
      const isWeak = items[move].strengths.find(
        (i: string) => i === selected.toLowerCase()
      );
      const isStrengths = items[move].weaknesses.find(
        (i: string) => i === selected.toLowerCase()
      );
      if (isStrengths) {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumWins + 1,
        };
      } else if (isWeak) {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumLoss + 1,
        };
      } else {
        record = {
          ...record,
          totalNumPlayed: i,
          totalNumWins: record.totalNumTies + 1,
        };
      }
    }
  }

  // get win percentage
  record = { ...record, winPercentage: winPercentage(record) };
  return record;
};

const winPercentage = (record: output) => {
  const { totalNumPlayed, totalNumWins, totalNumTies } = record;
  const percentage = totalNumWins + (0.5 * totalNumTies) / totalNumPlayed;

  return percentage;
};
