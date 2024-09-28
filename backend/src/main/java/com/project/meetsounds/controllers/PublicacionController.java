package com.project.meetsounds.controllers;

import com.project.meetsounds.domain.models.Publicacion;
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

    @QueryMapping
    public List<Publicacion> listarPublicaciones(){
        return this.publicacionService.listarPublicaciones();
    }

    @MutationMapping
    public Publicacion crearPublicacion(@Argument String descripcion, @Argument MultipartFile file){
        return publicacionService.crearPublicacion(descripcion, file);
    }
}
