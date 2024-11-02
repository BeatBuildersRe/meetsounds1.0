package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Comentario;
import com.project.meetsounds.domain.models.ComentarioOut;
import com.project.meetsounds.domain.models.Publicacion;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.IComentarioRepository;
import com.project.meetsounds.repositories.IPublicacionRepository;
import com.project.meetsounds.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {

    @Autowired
    private IComentarioRepository iComentarioRepository;

    @Autowired
    private IPublicacionRepository iPublicacionRepository;

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    public Boolean comentar(String publicacionId, String idAliasUsuario, String text) {
        Comentario comentario = new Comentario();
        comentario.setIdAliasUsuario(idAliasUsuario);
        comentario.setComentario(text);

        Comentario com = this.iComentarioRepository.save(comentario);
        Publicacion publicacion = new Publicacion();
        try {
            Optional<Publicacion> publiOptional = this.iPublicacionRepository.findById(publicacionId);
            publicacion = publiOptional.get();
            publicacion.getComentarios().add(com);
        }catch (NullPointerException n){
            System.out.println("NullPointer - ComentarioService - Comentar");
        }
        this.iPublicacionRepository.save(publicacion);
        return this.iComentarioRepository.existsById(com.getId());
    }

    public List<ComentarioOut> listarComentariosPorId(String publicacionId) {

        Optional<Publicacion> publicacionOptional = this.iPublicacionRepository.findById(publicacionId);
        Publicacion publicacion = publicacionOptional.get();

        List<Comentario> comentarios = publicacion.getComentarios();

        List<ComentarioOut> comentariosOut = new ArrayList<>();

        for (Comentario comentario : comentarios){
            ComentarioOut comentarioOut = new ComentarioOut();
            comentarioOut.setId(comentario.getId());
            comentarioOut.setComentario(comentario.getComentario());

            Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findByAlias(comentario.getIdAliasUsuario());
            Usuario usuario = usuarioOptional.get();
            comentarioOut.setUsuario(usuario);

            comentariosOut.add(comentarioOut);
        }

        return comentariosOut;
    }
}
