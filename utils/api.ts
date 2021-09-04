import axios from "axios";

const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api` });

export const apiGetImage = async (release: number): Promise<string> => {
  try {
    const { data } = await api.get<string>("/image", { params: { release } });
    return data;
  } catch (e: any) {
    console.log("e: ", e);
    throw e;
  }
};
