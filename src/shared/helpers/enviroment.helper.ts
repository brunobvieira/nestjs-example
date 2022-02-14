import * as dotenv from 'dotenv';
dotenv.config();

export const getEnviroments = (): any => {
  return process.env;
};

export const getAppSecret = (): string => {
  let enviroments = getEnviroments();
  return enviroments.SECRET ? enviroments.SECRET : 'THIS IS A SECRET';
};
