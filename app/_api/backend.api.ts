export const GetRouletteState = async () => {
  const response = await fetch("http://api.soluck.io/solana/roulette");
  const data = await response.json();
  console.log(data);
  return data;
};

export const StartRoulette = async () => {
  const response = await fetch("http://api.soluck.io/solana/api/start");
  const data = await response.json();
  console.log(data);
  return data;
};

export const EndRoulette = async () => {
  const response = await fetch("http://api.soluck.io/solana/api/random");
  const data = await response.json();
  console.log(data);
  return data;
};
