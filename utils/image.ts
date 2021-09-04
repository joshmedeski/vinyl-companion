import axios from "axios";

export const saveImgUrlToBlog = async (url: string): Promise<Blob> => {
  const { data } = await axios.get(url);
  console.log("data: ", data);
  return new Blob();
};
