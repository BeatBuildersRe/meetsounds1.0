package com.project.meetsounds.controllers;

import com.project.meetsounds.domain.models.Publicacion;

import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;


    @QueryMapping(name = "listarPublicaciones")
    public List<Publicacion> listarPublicaciones(){
        return this.publicacionService.listarPublicaciones();
    }

    @QueryMapping(name = "buscarPublicacionPorId")
    public Publicacion buscarPublicacionPorId(String id){
        return this.publicacionService.buscarPublicacionPorId(id);
    }

    @MutationMapping(name = "meGusta")
        public Boolean meGusta(@Argument String idPublicacion, @Argument String usuarioAlias){
        return this.publicacionService.meGusta(idPublicacion, usuarioAlias);
    }


    @MutationMapping(name = "crearPublicacion")
    public Publicacion crearPublicacion(@Argument String idUsuario, @Argument String descripcion, @Argument MultipartFile file){
        return publicacionService.crearPublicacion(idUsuario, descripcion, file);
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
