import rawInsults from "./insults-fi.json";

export interface Insult {
  // Example: emotion.neutral
  attribute: string;
  // Example: >
  operator: Operator;
  // Example: 0.9
  confidence: number;
  // You should show some feelings!
  message: string;
}

export enum Operator {
  ">" = ">",
  "<" = "<",
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
  const confidence = parseFloat(parts[2]);
  return { attribute, operator, confidence, message };
}
