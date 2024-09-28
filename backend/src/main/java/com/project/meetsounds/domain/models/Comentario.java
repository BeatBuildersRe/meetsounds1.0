package com.project.meetsounds.domain.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Comentario {
    @Id
    private String id;
    private String comentario;
    private Publicacion publicacion;
    private Usuario usuario;
}

