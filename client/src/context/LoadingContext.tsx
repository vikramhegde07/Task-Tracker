import React, { createContext, useContext, useState, type ReactNode } from "react"

type loadingProp = {
    children: ReactNode
}

type LoadingContextType = {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: loadingProp) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )

}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error("useLoading must be used within LoadingProvider");
    return context;
}