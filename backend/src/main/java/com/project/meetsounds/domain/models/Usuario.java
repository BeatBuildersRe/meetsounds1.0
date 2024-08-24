package com.project.meetsounds.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Usuarios")
public class Usuario {
    private String id;
    private String fotoUrl;
    private String nombre;
    private String apellido;
    private String alias;
    private String contrasena; //A veces no reconoce la Ñ
    private String email;
    private String telefono;
    private int edad;
    private LocalDate fecha_nac;
    private Ubicacion ubicacion;
    private int c_seguidores;
    private int c_seguidos;
    private List<Instrumento> misIntru;
    private List<Banda> misBandas;
    private String descripcion;
    private Redes redes;
    private LocalDate date;
}
