package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.*;
import com.project.meetsounds.repositories.IMeGustaRepository;
import com.project.meetsounds.repositories.IPublicacionRepository;
import com.project.meetsounds.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class PublicacionService {

    @Autowired
    private IPublicacionRepository iPublicacionRepository;

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Autowired
    private IMeGustaRepository iMeGustaRepository;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private MongoTemplate mongoTemplate;




    public void crearPublicacion(String idAlias, String descripcion, MultipartFile file) {
        Publicacion publi = new Publicacion();

        Optional<Usuario> usuarioOptional = iUsuarioRepository.findByAlias(idAlias);

        Usuario usu = usuarioOptional.orElseThrow(()-> new IllegalArgumentException("No se ha econtrado el usuario con el alias: " + idAlias));

        publi.setDescripcion(descripcion);
        publi.setIdUsuario(usu.getId());

        LocalDate fechaActual = LocalDate.now();
        int año = fechaActual.getYear();
        int mes = fechaActual.getMonthValue();
        int dia = fechaActual.getDayOfMonth();
        publi.setFecha(LocalDate.of(año, mes, dia));

        LocalTime horaActual = LocalTime.now();
        int hs = horaActual.getHour();
        int min = horaActual.getMinute();
        int seg = horaActual.getSecond();
        publi.setHora(LocalTime.of(hs, min, seg));

        if(!file.isEmpty()){
            if (!file.getContentType().startsWith("image/")) {
                System.out.println("El archivo debe ser una imagen");
            }
            try {
                // Subir la imagen a S3 (con la lógica de verificación de duplicados)
                String fileUrl = s3Service.uploadFile(file);
                publi.setMediaUrl(fileUrl);
            } catch (IOException | NoSuchAlgorithmException e) {
                System.out.println("Error al subir la imagen");
            }
        }
        Publicacion publicacion = iPublicacionRepository.save(publi);

            List<Publicacion> publicacionsUsuario = usu.getMisPublicaciones();
            publicacionsUsuario.add(publicacion);
            usu.setMisPublicaciones(publicacionsUsuario);
            iUsuarioRepository.save(usu);


    }

    public List<Publicacion> listarPublicacionesUsuario(String alias){
        Optional<Usuario> usuarioOptional=iUsuarioRepository.findByAlias(alias);
        Usuario user = new Usuario();
        if(usuarioOptional.isPresent()){
            user = usuarioOptional.get();
        }
        return user.getMisPublicaciones();
    }

    public List<PublicacionOut> listarPublicaciones() {
        List<Publicacion>  publicaciones = this.iPublicacionRepository.findAll();
        List<PublicacionOut> publicacionesOut = new ArrayList<>();
        for(Publicacion p : publicaciones){
            Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findById(p.getIdUsuario());
            Usuario usuario = usuarioOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado el usuario con id: " + p.getIdUsuario()));
            PublicacionOut publicacionOut = new PublicacionOut();
            publicacionOut.setId(p.getId());
            publicacionOut.setDescripcion(p.getDescripcion());
            publicacionOut.setMediaUrl(p.getMediaUrl());
            publicacionOut.setUsuario(usuario);
            publicacionesOut.add(publicacionOut);
        }
        return publicacionesOut;
    }

    public void eliminarPublicacion(String idAlias, String idPublicacion) {
        System.out.println(idPublicacion);
        Usuario usuario = new Usuario();
        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findByAlias(idAlias);
        usuario = usuarioOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado el usuario con alias: " + idAlias));

        List<Publicacion> misPublicaciones = usuario.getMisPublicaciones();
        misPublicaciones.removeIf( p -> p.getId().equals(idPublicacion));
        usuario.setMisPublicaciones(misPublicaciones);

        Query queryUp = new Query(Criteria.where("alias").is(idAlias));
        Update update = new Update().set("misPublicaciones", usuario.getMisPublicaciones());
        mongoTemplate.updateFirst(queryUp, update, Usuario.class);

        iPublicacionRepository.deleteById(idPublicacion);

    }

    public PublicacionOut buscarPublicacionPorIdOut(String id) {

        Optional<Publicacion> publicacionOptional = this.iPublicacionRepository.findById(id);
        Publicacion publicacion = publicacionOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado la publicacion con id: " + id ));
        List<ComentarioOut> comentarioOuts = this.comentarioService.listarComentariosPorId(id);

        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findById(publicacion.getIdUsuario());
        Usuario usuario = new Usuario();
        usuario = usuarioOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado el usuario con id: " + publicacion.getIdUsuario()));
        PublicacionOut publicacionOut = new PublicacionOut();
        publicacionOut.setUsuario(usuario);
        publicacionOut.setId(publicacion.getId());
        publicacionOut.setMediaUrl(publicacion.getMediaUrl());
        publicacionOut.setDescripcion(publicacion.getDescripcion());
        publicacionOut.setComentariosOut(comentarioOuts);
        return publicacionOut;
    }

    public Boolean meGusta(String idPublicacion, String usuarioAlias) {
        //Traer la publicacion
        Optional<Publicacion> publiOptional = iPublicacionRepository.findById(idPublicacion);
        Publicacion publicacion = publiOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado la publicacion con id: " + idPublicacion));

        publicacion.setCount_likes(publicacion.getCount_likes() + 1);
        MeGusta meGusta = new MeGusta();
        meGusta.setPublicacionId(idPublicacion);
        meGusta.setUsuarioAlias(usuarioAlias);

        this.iPublicacionRepository.save(publicacion);
        this.iMeGustaRepository.save(meGusta);
        return true;
    }

    public List<Usuario> misLikesPublicacion(String idPublicacion) {
        List<MeGusta> listaMeGusta = this.iMeGustaRepository.findMeGustaByIdPublicacion(idPublicacion);
        List<String> usuarioAliasList = new ArrayList<>();
        for (MeGusta meGusta : listaMeGusta){
            usuarioAliasList.add(meGusta.getUsuarioAlias());
        }
        return this.iUsuarioRepository.findAllByAlias(usuarioAliasList);
    }

    public Publicacion buscarPublicacionPorId(String id) {
        Publicacion publicacion = new Publicacion();
        Optional<Publicacion> publicacionOptional = this.iPublicacionRepository.findById(id);
        publicacion = publicacionOptional.orElseThrow(()-> new IllegalArgumentException("No se ha encontrado la publicacion con id: " + id));
        return publicacion;
    }


}
