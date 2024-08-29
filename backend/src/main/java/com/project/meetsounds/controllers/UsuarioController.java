package com.project.meetsounds.controllers;

import com.project.meetsounds.domain.models.Redes;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;


    @MutationMapping(name = "guardarUsuario")
    public Usuario guardarUsuario(@Argument Usuario user){
        return this.usuarioService.guardarUsuario(user);
    }

    @MutationMapping(name = "deleteByIdUser")
    public void deleteByIdUser(@Argument String id){
        this.usuarioService.deleteByIdUser(id);
    }

    @MutationMapping
    public Usuario updateUser(@Argument Usuario user){
        return this.usuarioService.updateUser(user);
    }

    @QueryMapping(name = "findByIdUser")
    public Optional<Usuario> findByIdUser(@Argument String id){
        return this.usuarioService.findByIdUser(id);
    }

    @QueryMapping(value = "findAllUser")
    public List<Usuario> findAllUser(){
        return this.usuarioService.findAllUser();
    }

    @QueryMapping(name = "buscarPorAlias")
    public Usuario buscarPorAlias(@Argument String alias){
        return this.usuarioService.buscarPorAlias(alias);
    }

    @QueryMapping(name = "findByTextUser") // Busqueda por nombre o apellido
    public List<Usuario> findByText(@Argument String text){
        return this.usuarioService.findByText(text);
    }


    @MutationMapping
    public void actualizarContrasena(@Argument String id,@Argument String contrasena){
        this.usuarioService.actualizarContrasena(id, contrasena);
    }

    @MutationMapping
    public Boolean actualizarRedes(@Argument String id, @Argument Redes redes){
        return this.usuarioService.actulizarRedes(id, redes);
    }

    @MutationMapping
    public void actualizarDescripcion(@Argument String id, @Argument String descripcion){
        this.usuarioService.actualizarDescripcion(id, descripcion);
    }

}
