package com.project.meetsounds.controllers;


import com.project.meetsounds.domain.models.Publicacion;
import com.project.meetsounds.domain.models.Redes;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;


    @MutationMapping(name = "seguirUsuario")
    public void seguirUsuario(@Argument String aliasSeguidor,@Argument String aliasSeguido){
        usuarioService.seguirUsuario(aliasSeguidor,aliasSeguido);
    }
    @MutationMapping(name = "dejarDeSeguirUsuario")
    public void dejarDeSeguirUsuario(@Argument String aliasSeguidor,@Argument String aliasSeguido){
        usuarioService.dejarDeSeguirUsuario(aliasSeguidor,aliasSeguido);
    }
    @QueryMapping(name = "verificaSiSigue")
    public Boolean verificaSiSigue(@Argument String aliasVisitante,@Argument String aliasPerfil){
        return usuarioService.verificaSiSigue(aliasVisitante,aliasPerfil);
    }

    @PostMapping("/actualizarFotoPerfil")
    public ResponseEntity<String> actualizarFotoPerfil(@RequestParam("file") MultipartFile file, @RequestParam("alias") String alias){
        return usuarioService.actualizarFotoPerfilUsuario(file,alias);
    }

    @PostMapping("/actualizarFotoPortada")
    public ResponseEntity<String> actualizarFotoPortada(@RequestParam("file") MultipartFile file, @RequestParam("alias") String alias){
        return usuarioService.actualizarFotoPortada(file,alias);
    }


    @MutationMapping(name = "guardarUsuario")
    public Usuario guardarUsuario(@Argument Usuario user){
        System.out.println("Recibido: " + user);
        return this.usuarioService.guardarUsuario(user);
    }

    @MutationMapping(name = "comprobarCredenciales")
    public void comprobarCredenciales(@Argument Usuario user){
        System.out.println("Recibido: " + user);
        usuarioService.comprobarCredenciales(user);
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
    public Optional<Usuario> buscarPorAlias(@Argument String alias){
        return usuarioService.buscarPorAlias(alias);
    }

    @QueryMapping(name = "buscarUsuarioPorTexto") // Busqueda por nombre o apellido
    public Set<Usuario> buscarUsuarioPorTexto(@Argument String text){
        return this.usuarioService.buscarUsuarioPorTexto(text);
    }

    @MutationMapping
    public void actualizarContrasena(@Argument String id,@Argument String contrasena){
        this.usuarioService.actualizarContrasena(id, contrasena);
    }

    @MutationMapping
    public Boolean actualizarRedes(@Argument String id, @Argument Redes redes){
        return this.usuarioService.actualizarRedes(id, redes);
    }

    @MutationMapping
    public void actualizarDescripcion(@Argument String id, @Argument String descripcion){
        this.usuarioService.actualizarDescripcion(id, descripcion);
    }

    @MutationMapping(name = "actualizarInstrumentosUsuario")
    public Usuario actualizarInstrumentosUsuario(@Argument String idInstrumento, @Argument String idUsuario){
        return usuarioService.actualizarInstrumentosUsuario(idInstrumento,idUsuario);
    }

    @QueryMapping(name = "buscarUsuariosPorInstrumentos")
    public List<Usuario> buscarUsuariosPorInstrumentos(@Argument List<String> instrumentos) {
        return usuarioService.buscarUsuariosPorInstrumentos(instrumentos);
    }

    @QueryMapping(name = "actualizarMisIntereses")
    public void actualizarMisIntereses( @Argument String id, @Argument List<String> intereses){
        usuarioService.actualizarMisIntereses(id, intereses);
    }

    /*Solo actualizar nombre y apellido, solo testeo*/
    /*@MutationMapping(name = "actualizarNombreApellido")
    public Usuario actualizarNombreApellido(@Argument String id, @Argument String nombre, @Argument String apellido) {
        return usuarioService.actualizarNombreApellido(id, nombre, apellido);
    }*/
    @MutationMapping(name = "actualizarNombreApellidoPorAlias")
    public Usuario actualizarNombreApellidoPorAlias(@Argument String alias, @Argument String nombre, @Argument String apellido) {
        return usuarioService.actualizarNombreApellidoPorAlias(alias, nombre, apellido);
    }

    @QueryMapping(name = "misLikesUsuario")
    public List<Publicacion> misLikesUsuario(@Argument String usuarioAlias){
        return this.usuarioService.misLikesUsuario(usuarioAlias);
    }

    @QueryMapping(name = "existByAlias")
    public Boolean existByAlias(@Argument String alias){
        return this.usuarioService.existByAlias(alias);
    }
}
