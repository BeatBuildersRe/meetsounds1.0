package com.project.meetsounds.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import com.project.meetsounds.services.SeguidosService;

@Controller
public class SeguidosController {
    @Autowired
    private SeguidosService seguidosService;

    @MutationMapping(name = "seguirUsuario")
    public void seguirUsuario(String idUsuario, String idSeguir){ //idSeguir es del usuario al cual vamos a seguir
        this.seguidosService.seguirUsuario(idUsuario, idSeguir);
    }
}
