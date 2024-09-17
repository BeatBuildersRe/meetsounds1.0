const Img_perfil = (props) => {
    return ( 
        <>
             {props.condicion && (
                <div className='Ver-img'><img onClick={props.funcion} id="Ver-img-perfil" src={props.img} alt="" /></div>
            )}
        </>
     );
}
 
export default Img_perfil;