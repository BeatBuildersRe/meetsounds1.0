package com.project.meetsounds.controllers;


import com.project.meetsounds.domain.models.Publicacion;

import com.project.meetsounds.domain.models.PublicacionOut;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;


    @QueryMapping(name = "listarPublicaciones")
    public List<Publicacion> listarPublicaciones(){
        return this.publicacionService.listarPublicaciones();
    }



    @QueryMapping(name = "buscarPublicacionPorId")
    public Publicacion buscarPublicacionPorId(@Argument String id){
        return this.publicacionService.buscarPublicacionPorId(id);
    }

    @QueryMapping(name = "buscarPublicacionPorIdOut")
    public PublicacionOut buscarPublicacionPorIdOut(@Argument String id){
        return this.publicacionService.buscarPublicacionPorIdOut(id);
    }

    @MutationMapping(name = "meGusta")
        public Boolean meGusta(@Argument String idPublicacion, @Argument String usuarioAlias){
        return this.publicacionService.meGusta(idPublicacion, usuarioAlias);
    }
    /*
    @MutationMapping(name = "crearPublicacion")
    public Publicacion crearPublicacion(@Argument String idAlias, @Argument String descripcion, @Argument MultipartFile file){
        return publicacionService.crearPublicacion(idAlias, descripcion, file);
    }

     */

    @PostMapping("/crearPublicacion")
    public Publicacion crearPublicacion(@RequestParam String idAlias, @RequestParam String descripcion, @RequestParam(required=false) MultipartFile file){
        return publicacionService.crearPublicacion(idAlias, descripcion, file);
    }

    @MutationMapping(name = "eliminarPublicacionPorId")
    public void eliminarPublicacionPorId(@Argument String idUsuario, @Argument String idPublicacion){
        publicacionService.eliminarPublicacion(idUsuario, idPublicacion);
    }

    @QueryMapping(name ="misLikesPublicacion") //trae la lista de usuarios que dieron me gusta
    public List<Usuario> misLikesPublicacion(@Argument String idPublicacion){
        return this.publicacionService.misLikesPublicacion(idPublicacion);

    }



}
