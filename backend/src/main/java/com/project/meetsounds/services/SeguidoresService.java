package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.ISeguidoresRepository;
import com.project.meetsounds.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeguidoresService {
    @Autowired
    private ISeguidoresRepository iSeguidoresRepository;

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    public List<Usuario> misSeguidores(String idAlias) {
        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findByAlias(idAlias);
        Usuario usuario = new Usuario();
        if (usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
        }
        return this.iUsuarioRepository.findAllByAlias(usuario.getSeguidores());
    }

    public void eliminarSeguidor(String idAliasUsuario, String idAliasSeguidor) {
        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findByAlias(idAliasUsuario);
        Usuario usuario = new Usuario();
        if (usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
        }

        Optional<Usuario> seguidorOptional = this.iUsuarioRepository.findByAlias(idAliasSeguidor);
        Usuario seguidor = new Usuario();
        if (usuarioOptional.isPresent()){
            seguidor = usuarioOptional.get();
        }

        usuario.getSeguidores().remove(seguidor.getAlias());
        seguidor.getSeguidos().remove(usuario.getAlias());

        this.iUsuarioRepository.save(usuario);
        this.iUsuarioRepository.save(seguidor);
    }
}
