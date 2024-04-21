// import { Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import './Estilo.css'
import { InputLogin } from "./componentes/inputLogin";


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

 
 
    return (
        <div>
            {/* <button onClick={handleClick} >Tela Inicial</button> */}

            <form>
               <p>Quantidade de caracteres do Email {emaillength}</p>

               <InputLogin 
                  label="Email"
                  value={email}
                  onChange={newValue => setEmail(newValue) }
                  onPressEnter={() => inputSenhaRef.current?.focus()}
               />

               <InputLogin 
                  type="password"
                  label="Senha"
                  value={senha}
                  onChange={newValue => setSenha(newValue) }
               />


              {/* <label>
                <span>Email</span>
                <input value={email} onChange={ e => setEmail(e.target.value) } onKeyDown={e => e.key === "Enter" ? inputSenhaRef.current?.focus() : undefined } />
              </label> */}
              {/* <label>
                <span>Senha</span>
                <input ref={inputSenhaRef} type="password" value={senha} onChange={ e => setSenha(e.target.value) } />
              </label> */}

              <button type="button" onClick={handleEntrar}  >
                Entrar
              </button>

            </form>
        </div>
    )
}