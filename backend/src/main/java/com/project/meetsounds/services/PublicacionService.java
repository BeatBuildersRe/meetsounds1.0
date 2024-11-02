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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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




    public Publicacion crearPublicacion(String idAlias, String descripcion, MultipartFile file) {
        Publicacion publi = new Publicacion();

        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findByAlias(idAlias);
        Usuario usuario = new Usuario();

        if(usuarioOptional.isPresent()){
            Usuario usu = usuarioOptional.get();
            usuario.setId(usu.getId());
            usuario.setNombre(usu.getNombre());
            usuario.setApellido(usu.getApellido());
            usuario.setAlias(usu.getAlias());
            usuario.setFotoPerfilUrl(usu.getFotoPerfilUrl());
        }
        publi.setUsuario(usuario);
        publi.setDescripcion(descripcion);

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



        //publi.setMediaUrl(this.s3Service.uploadFile(file));

        this.iPublicacionRepository.save(publi);
        //Guardamos la publicacion en la lista de "misPublicaciones" del usuario
        usuarioService.crearPublicacion(idAlias, publi);



        return publi;
    }



    public List<Publicacion> listarPublicaciones() {
        return this.iPublicacionRepository.findAll();
    }

    public void eliminarPublicacion(String idUsuario, String idPublicacion) {
        /*
        Query query = new Query(Criteria.where("_id").is(idUsuario));
        query.fields().include("misPublicaciones");
        Usuario usu = mongoTemplate.findOne(query, Usuario.class);

        List<Publicacion> publis = usu.getMisPublicaciones();
        System.out.println(publis.get(0).getDescripcion());
        publis.removeIf( p -> p.getId().equals(idPublicacion));
        usu.setMisPublicaciones(publis);

         */
        System.out.println(idPublicacion);
        Usuario usuario = new Usuario();
        Optional<Usuario> usuarioOptional = this.iUsuarioRepository.findById(idUsuario);
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
        }

        List<Publicacion> misPublicaciones = usuario.getMisPublicaciones();
        misPublicaciones.removeIf( p -> p.getId().equals(idPublicacion));
        usuario.setMisPublicaciones(misPublicaciones);

        Query queryUp = new Query(Criteria.where("_id").is(idUsuario));
        Update update = new Update().set("misPublicaciones", usuario.getMisPublicaciones());
        mongoTemplate.updateFirst(queryUp, update, Usuario.class);

        iPublicacionRepository.deleteById(idPublicacion);

    }

    public PublicacionOut buscarPublicacionPorIdOut(String id) {

        Optional<Publicacion> publicacionOptional = this.iPublicacionRepository.findById(id);
        Publicacion publicacion = publicacionOptional.get();
        List<ComentarioOut> comentarioOuts = this.comentarioService.listarComentariosPorId(id);

        PublicacionOut publicacionOut = new PublicacionOut();
        publicacionOut.setId(publicacion.getId());
        publicacionOut.setMediaUrl(publicacion.getMediaUrl());
        publicacionOut.setDescripcion(publicacion.getDescripcion());
        publicacionOut.setComentariosOut(comentarioOuts);
        publicacionOut.setUsuario(publicacion.getUsuario());
        return publicacionOut;
    }

    public Boolean meGusta(String idPublicacion, String usuarioAlias) {
        //Traer la publicacion
        Optional<Publicacion> publiOptional = iPublicacionRepository.findById(idPublicacion);
        try{
            Publicacion publicacion = publiOptional.get();
            publicacion.setCount_likes(publicacion.getCount_likes() + 1);

            MeGusta meGusta = new MeGusta();
            meGusta.setPublicacionId(idPublicacion);
            meGusta.setUsuarioAlias(usuarioAlias);

            this.iPublicacionRepository.save(publicacion);
            this.iMeGustaRepository.save(meGusta);

        }catch (NullPointerException e){
            System.out.println("No se pudo dar me gusta: " + e.getMessage());
        }
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
        try {
            Optional<Publicacion> publicacionOptional = this.iPublicacionRepository.findById(id);
            publicacion = publicacionOptional.get();
        }catch (NullPointerException n){
            System.out.println("NullPointer - PublicacionService - buscarPublicacionPorId");
        }
        return publicacion;
    }




    /*
    public void savePublicacion(Publicacion publi) {
        this.publi_reposotory.save(publi);
    }
     */

}
