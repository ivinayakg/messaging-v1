import { useMutation, useQuery } from "react-query";
import axios from "../../../services/api";
import { createTokenHeader } from "../../../services/utils";

const sendAMessage = (token, data) =>
  axios.post("/messages/new", data, createTokenHeader(token));

const getAllMessages = (token, query) => {
  if (!query) return;

  let queryString = `${query.channelId}/messages?limit=${query.limit ?? 30}`;
  if (query.before) {
    queryString += `&before=${query.before}`;
  }

  return axios.get(
    `/messages/channel/${queryString}`,
    createTokenHeader(token)
  );
};

const useSendAMessage = () =>
  useMutation(({ token, data }) => sendAMessage(token, data), {});
const useGetAllMessages = (token, query) =>
  useQuery(
    `single-channel-${query.channelId}`,
    () => getAllMessages(token, query),
    {
      // select: (data) => {
      //   if (data.data.success) {
      //     return data.data.data;
      //   }
      // },
    }
  );

export { useSendAMessage, useGetAllMessages };
