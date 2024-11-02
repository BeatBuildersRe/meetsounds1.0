const Comentarios = ({onValorDevuelto}) =>{
    const atras = () =>{
        onValorDevuelto(null);
        return null;
    };
    return(
        <>
            <button  onClick={() => atras()}>atras</button>
            <h1>comettarios</h1>
        </>
    )
}
export default Comentarios;