package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Publicacion;
import com.project.meetsounds.repositories.IPublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private S3Service s3Service;


    public Publicacion crearPublicacion(String descripcion, MultipartFile file) {
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

        return this.iPublicacionRepository.save(publi);
    }



    public List<Publicacion> listarPublicaciones() {
        return this.iPublicacionRepository.findAll();
    }

    /*
    public void savePublicacion(Publicacion publi) {
        this.publi_reposotory.save(publi);
    }
     */

}
