import { useQuery } from "react-query";
import { checkAuth } from "../api/auth";

const useCheckAuth = () => {
    const { isLoading: isCheckingAuth, data } = useQuery(
        ['checkAuth'],
        async () => checkAuth(),
        { cacheTime: 1 }
    );

    return {
        isCheckingAuth,
        isAuthed: data?.status ?? false,
        user: data?.user ?? null,
    };
};

export default useCheckAuth;