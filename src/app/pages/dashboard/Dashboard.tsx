// import { useContext, useRef } from "react"
// import { Link } from "react-router-dom"
// import { UsuarioLogadoContext } from "../../shared/contexts"

import { useCallback, useEffect, useState  } from "react"
import { ITarefa, TarefasService } from "../../shared/services/api/tarefas/TarefasService";
import { ApiException } from "../../shared/services/api/ApiException";


export const Dashboard = () => {
    // const counterRef = useRef({counter: 0})

    // const usuarioLogadoContext = useContext(UsuarioLogadoContext)

    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect( () => {
      TarefasService.getAll()
          .then((result) => {
            if(result instanceof ApiException){
              alert(result.message);

            }else{
              setLista(result);
            }
          })
    },[])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback( (e) => {
      if(e.key === "Enter"){
        if(e.currentTarget.value.trim().length === 0) return;

        const value = e.currentTarget.value;

        e.currentTarget.value = '';

        // veririfica se o titulo digitado já existe
        if(lista.some((ListItem) => ListItem.title === value)) return;
  
        TarefasService.create({ title: value, isCompleted: false })
        .then((result) => {
          if(result instanceof ApiException){
            alert(result.message);

          }else{
            setLista((oldLista) => [...oldLista, result] );
          }
        });
      }
    },[lista]);

    const handleToogleComplete = useCallback((id: number) =>{
      const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);
      if(!tarefaToUpdate) return;
      TarefasService.updateById(id, {
        ...tarefaToUpdate,
        isCompleted: !tarefaToUpdate.isCompleted
      })
      .then((result) => {

        if(result instanceof ApiException){
          alert(result.message);

        }else{
          setLista( oldLista => {
            return oldLista.map(oldListaItem => {
              if(oldListaItem.id === id) return result;
              return oldListaItem;
            });
          });
        }
      })
    },[lista]);



      const handleDelete = useCallback((id: number) => {
        TarefasService.deleteById(id)
        .then((result) => {
  
          if(result instanceof ApiException){
            alert(result.message);
            } else {
            setLista( oldLista => {
              return oldLista.filter(oldListaItem => oldListaItem.id !== id);
            });
          }                   

        });
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
                    { return <li key={ListItem.id}>
                      <input 
                        type="checkbox"
                        checked={ListItem.isCompleted}
                        onChange={()=> {handleToogleComplete(ListItem.id)}} 
                      />
                      {ListItem.title}

                      <button onClick={()=> {handleDelete(ListItem.id)}}>Apagar</button>
                    </li>;
                })}
            </ul>
        </div>
    )
}