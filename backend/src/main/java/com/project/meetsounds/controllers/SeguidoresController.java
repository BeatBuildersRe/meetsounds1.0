package com.project.meetsounds.controllers;

import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.SeguidoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SeguidoresController {
    @Autowired
    private SeguidoresService seguidoresService;

    @QueryMapping(name = "misSeguidores")
    public List<Usuario> misSeguidores(String idAlias){
        return this.seguidoresService.misSeguidores(idAlias);
    }

    @MutationMapping(name = "eliminarSeguidor")
    public void eliminarSeguidor(String idAliasUsuario, String idAliasSeguidor){
        this.seguidoresService.eliminarSeguidor(idAliasUsuario, idAliasSeguidor);
    }
}
