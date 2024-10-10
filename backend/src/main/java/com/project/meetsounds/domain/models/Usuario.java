package com.project.meetsounds.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class Usuario {
    private String id;
    private String fotoPerfilUrl;
    private String fotoPortadaUrl;
    private String nombre;
    private String apellido;
    private String nombreUsuario;
    private String alias;
    private String contrasena; //A veces no reconoce la Ñ
    private String email;
    private String telefono;
    private int edad;
    private String genero;
    private LocalDate fecha_nac;
    private Ubicacion ubicacion;
    private int c_seguidores;
    private int c_seguidos;

    private List<Instrumento> misInstru = new ArrayList<>();
    private List<Interes> misIntereses;
    private List<Banda> misBandas;
    private List<Publicacion> misPublicaciones;

    private String descripcion;
    private Redes redes;
    private LocalDate date;
}
