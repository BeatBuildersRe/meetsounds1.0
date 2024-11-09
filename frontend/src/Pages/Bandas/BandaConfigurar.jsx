import MenuDerechoDiv from "@c/Menu/Derecha";
import Defaul_portada from "@public/ract.jpg";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

import { useNavigate } from "react-router-dom";
import GetAlias from "../../services/GetAlias";
import ServiceBandas from "../../services/ServiceBandas";
import { accordionActionsClasses } from "@mui/material";
const BandaConfigurar = () => {
  const [banda, setBanda] = useState();
  useEffect(() => {
    // Recuperar el objeto desde localStorage
    const bandaData = JSON.parse(localStorage.getItem("banda"));
    setBanda(bandaData);
  }, []);
  const alias = GetAlias();
  const navigate = useNavigate();

  useEffect(() => {
    ListarMiembros(alias);
  }, [alias]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState(
    banda?.urlFotoPortada ?? Defaul_portada
  ); // Para la vista previa de la imagen
  const { ActualizarPortada, ListarMiembros, Miembros, finish } =
    ServiceBandas();
  // Manejar el envío del formulario
  const onSubmit = (data) => {
    console.dir(data);
    const PortadaImg = data.portada[0];
    ActualizarPortada(banda?.id, PortadaImg);
    if (finish) {
      console.log("true"); // no actualizamos la preview
    } else {
      setPreviewImage(data.portada);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Actualizar la vista previa
    }
  };

  return (
    <>
      <div className="Contenedor">
        <div className="contenedor2">
          <div className="izquierda-bandas">
            <div className="Banda">
              <img src={previewImage} alt="Portada" width="100%" />
            </div>
            {console.log(Miembros)}

            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Cambiar portada:</label>
              <input
                type="file"
                {...register("portada", { required: true })} // Registrar el input en react-hook-form
                onChange={handleImageChange} // Actualizar la vista previa al seleccionar una imagen
                accept="image/*" // Limitar a archivos de imagen
              />
              <br></br>
              <br></br>
              {errors.portada && <span>Debes seleccionar una imagen</span>}{" "}
              <h4>Agregar Miembros</h4>
              <br />
              {Miembros?.map((miembro, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={miembro.alias}
                    {...register("hobbies")}
                  />
                  {miembro.alias}
                  <Checkbox {...label} defaultChecked color="success" />

                  <br></br>
                </label>
              ))}
              <input type="checkbox" name="username" />
              <br></br>
              <button type="submit">Guardar cambios</button>
            </form>
          </div>
          <MenuDerechoDiv />
        </div>
      </div>
    </>
  );
};

export default BandaConfigurar;
