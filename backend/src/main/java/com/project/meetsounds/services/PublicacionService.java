package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.MeGusta;
import com.project.meetsounds.domain.models.Publicacion;
import com.project.meetsounds.domain.models.Usuario;
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
    private UsuarioService usuarioService;

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Autowired
    private IMeGustaRepository iMeGustaRepository;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private MongoTemplate mongoTemplate;




    public Publicacion crearPublicacion(String id, String descripcion, MultipartFile file) {
        Publicacion publi = new Publicacion();

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

        //Guardamos la publicacion en la lista de "misPublicaciones" del usuario
        usuarioService.crearPublicacion(id, publi);

        return this.iPublicacionRepository.save(publi);
    }



    public List<Publicacion> listarPublicaciones() {
        return this.iPublicacionRepository.findAll();
    }

    public void eliminarPublicacion(String idUsuario, String idPublicacion) {

        Query query = new Query(Criteria.where("_id").is(idUsuario));
        query.fields().include("misPublicaciones");
        Usuario usu = mongoTemplate.findOne(query, Usuario.class);

        List<Publicacion> publis = usu.getMisPublicaciones();
        publis.removeIf( p -> p.getId().equals(idPublicacion));
        usu.setMisPublicaciones(publis);

        Query queryUp = new Query(Criteria.where("_id").is(idUsuario));
        Update update = new Update().set("misPublicaciones", usu.getMisPublicaciones());
        mongoTemplate.updateFirst(queryUp, update, Usuario.class);

        iPublicacionRepository.deleteById(idPublicacion);

    }

    public Publicacion buscarPublicacionPorId(String id) {
        return this.iPublicacionRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Publiacion no encontrada con ID: " + id)
        );
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

    /*
    public void savePublicacion(Publicacion publi) {
        this.publi_reposotory.save(publi);
    }
     */

}
