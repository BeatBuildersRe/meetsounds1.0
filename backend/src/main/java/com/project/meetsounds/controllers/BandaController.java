package com.project.meetsounds.controllers;


import com.project.meetsounds.domain.models.Banda;
import com.project.meetsounds.services.BandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class BandaController {

    @Autowired
    private BandaService bandaService;

    @QueryMapping
    public List<Banda> listarBandas(){
        return bandaService.listarBandas();
    }

    @QueryMapping(name = "buscarBandaPorId")
    public Optional<Banda> buscarBandaPorId(String idBanda){return bandaService.buscarBandaPorId(idBanda);}

    @QueryMapping(name = "listarBandasPorNombre")
    public List<Banda> listarBandasPorNombre(@Argument String nombre){
        return bandaService.listarPorNombre(nombre);
    }

    @MutationMapping(name = "crearBanda")
    public Banda crearBanda(@Argument String nombreBanda, @Argument String idUsuario){
        return bandaService.crearBanda(nombreBanda, idUsuario);
    }

    @MutationMapping(name = "actualizarDescripcion")
    public void actualizarDescripcion(@Argument String idBanda, @Argument String descripcion){
        bandaService.actualizarDescripcion(idBanda, descripcion);
    }

    @MutationMapping(name = "añadirMiembros")
    public void añadirMiembros(@Argument String idBanda, @Argument List<String> idUsuarios){
        bandaService.añadirMiembros(idBanda, idUsuarios);
    }

    @MutationMapping(name = "eliminarMiembro")
    public void eliminarMiembro(@Argument String idBanda, @Argument String idUsuario){
        bandaService.eliminarMiembro(idBanda, idUsuario);
    }
}
