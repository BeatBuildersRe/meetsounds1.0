import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';


const GetAlias = () => {
    const [alias, setAlias] = useState(undefined);
    

    useEffect(() => {
        const storedAlias = Cookies.get('alias');
        if (storedAlias) {
            setAlias(storedAlias);
        }
    }, []); // Ejecuta solo una vez al montar el componente

   return alias
}

export default GetAlias;