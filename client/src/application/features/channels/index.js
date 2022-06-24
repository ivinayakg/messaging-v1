import { useMutation, useQuery } from "react-query";
import axios from "../../../services/api";
import { createTokenHeader } from "../../../services/utils";

const createChannel = (token, data) =>
  axios.post("/channel/create", data, createTokenHeader(token));
const getAllChannels = (token) =>
  axios.get("/channel/all", createTokenHeader(token));
const getAllUserChannels = (token) =>
  axios.get("/user/channel/all", createTokenHeader(token));
const getSingleChannel = (channelId) => axios.get(`/channels/${channelId}`);
const joinChannel = (token, data) =>
  axios.post("/channel/join", data, createTokenHeader(token));

const useCreateChannel = () =>
  useMutation(({ token, data }) => createChannel(token, data), {});
const useGetAllChannels = (token) =>
  useQuery("all-channels", () => getAllChannels(token), {});
const useGetAllUserChannels = (token) =>
  useQuery("all-user-channels", () => getAllUserChannels(token), {});
const useSingleChannel = (channelId) =>
  useQuery(
    ["single-channel", channelId],
    () => getSingleChannel(channelId),
    {}
  );
const useJoinSingleChannel = () =>
  useMutation(({ token, data }) => joinChannel(token, data), {});

export {
  useCreateChannel,
  useGetAllChannels,
  useSingleChannel,
  useGetAllUserChannels,
  useJoinSingleChannel,
};
