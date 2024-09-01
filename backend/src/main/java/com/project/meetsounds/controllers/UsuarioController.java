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

    @MutationMapping(name = "eliminarPorIdUsuario")
    public void eliminarPorIdUsuario(@Argument String id){
        this.usuarioService.eliminarPorIdUsuario(id);
    }

    @MutationMapping(name ="actualizarUsuario")
    public Usuario actualizarUsuario(@Argument String id ,@Argument Usuario user){
        return this.usuarioService.actualizarUsuario(id,user);
    }

    @QueryMapping(name = "buscarUsuarioPorId")
    public Optional<Usuario> buscarUsuarioPorId(@Argument String id){
        return this.usuarioService.buscarUsuarioPorId(id);
    }

    @QueryMapping(value = "buscarTodosLosUsuarios")
    public List<Usuario> buscarTodosLosUsuarios(){
        return usuarioService.buscarTodosLosUsuarios();
    }

    @QueryMapping(name = "buscarPorAlias")
    public Usuario buscarPorAlias(@Argument String alias){
        return this.usuarioService.buscarPorAlias(alias);
    }

    @QueryMapping(name = "buscarUsuarioPorTexto") // Busqueda por nombre o apellido
    public List<Usuario> buscarUsuarioPorTexto(@Argument String text){
        return this.usuarioService.buscarUsuarioPorTexto(text);
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

    @MutationMapping(name = "actualizarInstrumentosUsuario")
    public Usuario actualizarInstrumentosUsuario(@Argument String idInstrumento, @Argument String idUsuario){
        return usuarioService.actualizarInstrumentosUsuario(idInstrumento,idUsuario);
    }

}
