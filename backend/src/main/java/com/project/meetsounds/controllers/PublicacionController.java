package com.project.meetsounds.controllers;


import com.project.meetsounds.domain.models.Publicacion;

import com.project.meetsounds.domain.models.PublicacionOut;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;


    @GetMapping("/listarPublicaciones")
    public Page<Publicacion> listarPublicaciones(@RequestParam int page,@RequestParam int size){
        return publicacionService.listarPublicaciones(page, size);
    }

    @GetMapping("/listarPublicacionesUsuario")
    public List<Publicacion> listarPublicacionesUsuario(@RequestParam String alias){
        return publicacionService.listarPublicacionesUsuario(alias);
    }

    @GetMapping("/buscarPublicacionPorId")
    public Publicacion buscarPublicacionPorId(@RequestParam String id){
        return publicacionService.buscarPublicacionPorId(id);
    }

    @PostMapping("/darMeGusta")
        public Boolean darMeGusta(@RequestParam String idPublicacion, @RequestParam String usuarioAlias){
        return this.publicacionService.darMeGusta(idPublicacion, usuarioAlias);
    }

    @PostMapping("/quitarMeGusta")
    public Boolean quitarMeGusta(@RequestParam String idPublicacion, @RequestParam String usuarioAlias){
        return this.publicacionService.quitarMeGusta(idPublicacion, usuarioAlias);
    }

    @PostMapping("/usuarioHaDadoMeGusta")
    public Boolean usuarioHaDadoMeGusta(@RequestParam String idPublicacion, @RequestParam String usuarioAlias){
        return this.publicacionService.usuarioHaDadoMeGusta(idPublicacion, usuarioAlias);
    }
    /*
    @MutationMapping(name = "crearPublicacion")
    public Publicacion crearPublicacion(@Argument String idAlias, @Argument String descripcion, @Argument MultipartFile file){
        return publicacionService.crearPublicacion(idAlias, descripcion, file);
    }

     */

    @PostMapping("/crearPublicacion")
    public void crearPublicacion(@RequestParam String idAlias, @RequestParam(required=false) String descripcion, @RequestParam(required=false) MultipartFile file){
        publicacionService.crearPublicacion(idAlias, descripcion, file);
    }

    @MutationMapping(name = "eliminarPublicacionPorId")
    public void eliminarPublicacionPorId(@Argument String idUsuario, @Argument String idPublicacion){
        publicacionService.eliminarPublicacion(idUsuario, idPublicacion);
    }





}
