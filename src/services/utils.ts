export const delayBetweenAction = (delayTime: number) =>
  new Promise((resolve) => setTimeout(resolve, delayTime));
