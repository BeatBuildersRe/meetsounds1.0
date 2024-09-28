package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Publicacion;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.IPublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class PublicacionService {

    @Autowired
    private IPublicacionRepository iPublicacionRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private MongoTemplate mongoTemplate;



    public Publicacion crearPublicacion(String id, String descripcion, MultipartFile file) {
        Publicacion publi = new Publicacion();

        publi.setDescription(descripcion);

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

    /*
    public void savePublicacion(Publicacion publi) {
        this.publi_reposotory.save(publi);
    }
     */

}
