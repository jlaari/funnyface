import rawInsults from "./insults-fi.json";

export interface Insult {
  // Example: emotion.neutral, glasses
  attribute: string;
  // Example: >, <, or =
  operator: Operator;
  // Example: 0.9, or "ReadingGlasses"
  value: InsultValue;
  // You should show some feelings!
  message: string;
}

export type InsultValue = number | string;

export enum Operator {
  ">" = ">",
  "<" = "<",
  "==" = "==",
}

export const getInsults = (): Insult[] => {
  const insults: Array<Insult> = rawInsults.map((insult) => {
    return parseSingle(insult.condition, insult.message);
  });
  return insults;
};

function parseSingle(condition: string, message: string): Insult {
  const parts = condition.split(" ");
  const attribute = parts[0];
  const operator: Operator = <Operator>(<unknown>parts[1]);
  const rawValue = parts[2];
  const value = hasNumber(rawValue) ? parseFloat(rawValue) : rawValue;
  return { attribute, operator, value, message };
}

function hasNumber(string: string) {
  return /\d/.test(string);
}
