package com.project.meetsounds.domain.models;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PublicacionOut {
    private String id;
    private String descripcion;
    private String mediaUrl;
    private List<ComentarioOut> comentariosOut = new ArrayList<>();
    private Usuario usuario;
}
