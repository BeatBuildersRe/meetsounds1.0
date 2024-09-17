const Img_fondo = (props) => {
    return ( 
        <>
             {props.condicion && (
                <div className='Ver-img'><img onClick={props.funcion} id="Ver-img-fondo" src={props.img} alt="" /></div>
            )}
        </>
     );
}
 
export default Img_fondo;