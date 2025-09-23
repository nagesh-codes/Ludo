import { ROOMS } from "./data.js";


export const generateRandomID = () => {
  try {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result;
    const charactersLength = characters.length;
    const length = 6;
    do {
      result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    } while (Object.keys(ROOMS).some(room => room === result))
    return result;
  } catch (er) {
    console.log(er.message);
  }
}