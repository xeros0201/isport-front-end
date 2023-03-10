import { useSearchParams } from "react-router-dom";

/**
 * Hook for managing state by using URL search parameters (e.g. The "?key=value" in the URL).
 * 
 * Source:
 * - https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
 */
function useSearchParamsState(
    searchParamName: string,
    defaultValue: string,
): readonly [
    searchParamsState: string,
    setSearchParamsState: (newState: string) => void
] {
    const [searchParams, setSearchParams] = useSearchParams();

    const acquiredSearchParam = searchParams.get(searchParamName);
    const searchParamsState = acquiredSearchParam ?? defaultValue;

    const setSearchParamsState = (newState: string) => {
        const next = Object.assign(
            {},
            [...searchParams.entries()].filter(([k, v]) => v !== '').reduce(
                (o, [key, value]) => ({ ...o, [key]: value }),
                {}
            ),
            { [searchParamName]: newState }
        );
        setSearchParams(next);
    };
    
    return [searchParamsState, setSearchParamsState];
}

export default useSearchParamsState;