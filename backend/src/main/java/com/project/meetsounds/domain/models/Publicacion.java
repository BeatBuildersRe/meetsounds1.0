package com.project.meetsounds.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Publicaciones")
public class Publicacion {
    @Id
    private String id;
    private String descripcion;
    private String mediaUrl;
    //private LocalDate fecha;
    //private LocalTime hora;
    private LocalDateTime fechaHora;
    private int count_coment;
    private int count_likes;
    private List<Comentario> comentarios = new ArrayList<>();
    private List<MeGusta> meGustas;
    private String idUsuario;


}
