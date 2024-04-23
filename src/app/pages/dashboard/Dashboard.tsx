// import { useContext, useRef } from "react"
// import { Link } from "react-router-dom"
// import { UsuarioLogadoContext } from "../../shared/contexts"

import { useCallback, useState  } from "react"

interface IListItem{
    id: number;
    title: string;
    isCompleted : boolean;
}

export const Dashboard = () => {
    // const counterRef = useRef({counter: 0})

    // const usuarioLogadoContext = useContext(UsuarioLogadoContext)

    const [lista, setLista] = useState<IListItem[]>([]);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback( (e) => {
      if(e.key === "Enter"){
        if(e.currentTarget.value.trim().length === 0) return;

        const value = e.currentTarget.value;

        e.currentTarget.value = '';

        setLista((oldLista) => {

            if(oldLista.some((ListItem) => ListItem.title === value)) return oldLista

            return [...oldLista, {
                id: oldLista.length,
                title: value,
                isCompleted: false,

            }]

        });
      }

    },[]);

    return(
        <div>
           {/* <p>DASHBOARD</p>
           <p>{usuarioLogadoContext.nomeDoUsuario="Pedro Bruno R"}</p>
           <p>Contador: {counterRef.current.counter}</p>
           <button onClick={() => counterRef.current.counter ++} >Somar</button>
           <Link to="/entrar">Entrar</Link> */}

            <p>Lista</p>
            <input onKeyDown={handleInputKeyDown} />

            <p>{lista.filter((ListItem)=>ListItem.isCompleted).length}</p>

            <ul>
                {lista.map((ListItem) =>
                    { return <li key={ListItem.title}>
                    <input 
                       onChange={()=> {
                         setLista((oldLista) => {
                           return oldLista.map(oldListItem => {
                             const newSelectted = oldListItem.title === ListItem.title
                             ? !oldListItem.isCompleted
                             : oldListItem.isCompleted;
                             return {

                                ...oldListItem,
                                isSelected : newSelectted
                             };
                           });
                         })
                       }}
                       type="checkbox" checked={ListItem.isCompleted}/>
                    {ListItem.title}
                    </li>
                })}
            </ul>


        </div>
    )
}