// import { Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import './Estilo.css'
import { InputLogin } from "./componentes/inputLogin";
import { ButtonLogin } from "./componentes/buttonLogin";
import { UsuarioLogadoContext } from "../../shared/contexts";


export const Login = () => {
    const inputSenhaRef = useRef<HTMLInputElement>(null);

   // const history = useNavigate();

    // const handleClick = () => {
    //     history('/tela-inicial')

    // }

    const [email, setEmail]=useState("")
    const [senha, setSenha]=useState("")

    useEffect( () => {
        console.log('entrei')

    },[])


    // useEffect( () => {
    //     console.log("veio do useEffect")
    //     console.log(email)
    //     console.log(senha)
    // },[email,senha])

    useEffect( () => {
        console.log("veio do useEffect email")
        console.log(email)
    },[email])

    useEffect( () => {
        console.log("veio do useEffect senha")
        console.log(senha)
    },[senha])

    const handleEntrar = useCallback( () => {
         console.log(email)
         console.log(senha)
        
    },[email,senha])
    
    const emaillength = useMemo(() => {
       return email.length
    }, [email.length]);

    const usuarioLogadoContext = useContext(UsuarioLogadoContext);
    // usuarioLogadoContext.nomeDoUsuario = "teste teste teste"

 
    return (
        <div>
            {/* <button onClick={handleClick} >Tela Inicial</button> */}

            <form>
               <p>Quantidade de caracteres do Email {emaillength}</p>
               <p>{usuarioLogadoContext.nomeDoUsuario}</p>
               <InputLogin 
                  label="Email"
                  value={email}
                  onChange={newValue => setEmail(newValue) }
                  onPressEnter={() => inputSenhaRef.current?.focus()}
               />

               <InputLogin 
                  ref={inputSenhaRef}
                  type="password"
                  label="Senha"
                  value={senha}
                  onChange={newValue => setSenha(newValue) }
               />

               <ButtonLogin type="button" onClick={handleEntrar}>
                  Entrar
               </ButtonLogin>
               
               <ButtonLogin type="button" onClick={handleEntrar}>
                  Cadastrar
               </ButtonLogin>


              {/* <button type="button" onClick={handleEntrar}  >
                Entrar
              </button> */}

            </form>
        </div>
    )
}