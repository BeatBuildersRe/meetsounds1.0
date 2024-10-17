package com.project.meetsounds.domain.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
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
    private String description;
    private String mediaUrl;
    private LocalDate fecha;
    private LocalTime hora;

    private int count_coment;
    private int count_likes;
    private List<Comentario> comentarios;
    private List<MeGusta> meGustas;
    private Object entity;


}
