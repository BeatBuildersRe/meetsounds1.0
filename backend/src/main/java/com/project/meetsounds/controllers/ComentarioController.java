package com.project.meetsounds.controllers;

import com.project.meetsounds.domain.models.ComentarioOut;
import com.project.meetsounds.services.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ComentarioController {
    @Autowired
    private ComentarioService comentarioService;

    @MutationMapping(name = "comentar")
    public Boolean comentar(@Argument String publicacionId, @Argument String idAliasUsuario, @Argument String text){
        return this.comentarioService.comentar(publicacionId, idAliasUsuario, text);
    }

    @QueryMapping(name = "listarComentariosPorId")
    public List<ComentarioOut> listarComentariosPorId(@Argument String publicacionId){
        return this.comentarioService.listarComentariosPorId(publicacionId);
    }
}
