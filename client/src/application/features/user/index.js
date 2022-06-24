import { useMutation, useQuery } from "react-query";
import { LoginCall } from "../../../services/calls/form/login";
import { RegisterCall } from "../../../services/calls/form/register";

const useLoginUser = () => useMutation(LoginCall, {});
const useRegisterUser = () => useMutation(RegisterCall, {});

export { useLoginUser, useRegisterUser };
