
import React, { createContext } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario?: string;
    children?: React.ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>(
    {} as IUsuarioLogadoContextData
);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoContextData> = ({ nomeDoUsuario, children }) => {
    nomeDoUsuario = "Aqui um texto fixo"
    return (
        <UsuarioLogadoContext.Provider
            value={{ nomeDoUsuario }}>
                
            {children}
        </UsuarioLogadoContext.Provider>
    );
}


