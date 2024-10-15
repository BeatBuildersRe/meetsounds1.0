package com.project.meetsounds.services;

import com.project.meetsounds.controlErrores.AliasAlreadyExistsException;
import com.project.meetsounds.controlErrores.AliasAndEmailAlreadyExistsException;
import com.project.meetsounds.controlErrores.EmailAlreadyExistsException;
import com.project.meetsounds.controlErrores.MenorDeEdadException;
import com.project.meetsounds.domain.models.*;
import com.project.meetsounds.repositories.IMeGustaRepository;
import com.project.meetsounds.repositories.IPublicacionRepository;
import com.project.meetsounds.repositories.IUsuarioRepository;
import graphql.GraphQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;
    @Autowired
    private IMeGustaRepository iMeGustaRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private InstrumentoService instrumentoService;
    @Autowired
    private IPublicacionRepository iPublicacionRepository;
    @Autowired
    S3Service s3Service;

    public void comprobarCredenciales(Usuario user){
        if (usuarioRepository.findByAlias(user.getAlias()).isPresent() && usuarioRepository.findByEmail(user.getEmail()).isPresent()){ //Si no se encuentra ningun usuario con el mismo alias, el usuario se crea.
            throw new AliasAndEmailAlreadyExistsException("El Alias y el Email ya existen!");
        }

        if(usuarioRepository.findByAlias(user.getAlias()).isPresent()){
            throw new AliasAlreadyExistsException("El Alias ya existe!");
        }

        if(usuarioRepository.findByEmail(user.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("El Email ya existe!");
        }
    }

    public Usuario guardarUsuario(Usuario user) {

        user.setC_seguidores(0);
        user.setC_seguidos(0);
        //Generar Fecha
        LocalDate fechaActual = LocalDate.now();
        int year = fechaActual.getYear();
        int mes = fechaActual.getMonthValue();
        int dia = fechaActual.getDayOfMonth();
        user.setDate(LocalDate.of(year, mes, dia));
        user.setAlias(user.getAlias());

        if(!esMayorDeEdad(user.getFechaNacimiento())){
            throw new MenorDeEdadException("Debe ser mayor de 18 años");
        }

        if (usuarioRepository.findByAlias(user.getAlias()).isPresent() && usuarioRepository.findByEmail(user.getEmail()).isPresent()){ //Si no se encuentra ningun usuario con el mismo alias, el usuario se crea.
            throw new AliasAndEmailAlreadyExistsException("El Alias y el Email ya existen!");
        }

        if(usuarioRepository.findByAlias(user.getAlias()).isPresent()){
            throw new AliasAlreadyExistsException("El Alias ya existe!");
        }

        if(usuarioRepository.findByEmail(user.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException("El Email ya existe!");
        }
        return usuarioRepository.save(user);
    }

    private boolean esMayorDeEdad(LocalDate fechaNacimiento){
        LocalDate hoy = LocalDate.now();
        Period periodo = Period.between(fechaNacimiento, hoy);
        return periodo.getYears() >= 18;
    }

    public boolean loginUsuario(String username, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByAlias(username);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Aquí puedes implementar un hash o algún algoritmo de seguridad para comparar las contraseñas
            return usuario.getContrasena().equals(contrasena);
        }

        return false;
    }

    public ResponseEntity<String> actualizarFotoPerfilUsuario(MultipartFile file, String alias) {
        // Validaciones previas (opcional), como el tamaño o el tipo de archivo
        Optional<Usuario> usuarioOptional = usuarioRepository.findByAlias(alias);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.badRequest().body("No existe usuario con el alias: " + alias);
        }

        Usuario usuario = usuarioOptional.get();

        // Validar archivo (opcional)
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("El archivo está vacío");
        }

        if (!file.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body("El archivo debe ser una imagen");
        }

        try {
            // Subir la imagen a S3 (con la lógica de verificación de duplicados)
            String fileUrl = s3Service.uploadFile(file);

            // Actualizar la URL de la foto de perfil del usuario
            usuario.setFotoPerfilUrl(fileUrl);
            usuarioRepository.save(usuario);

            // Devolver la URL de la imagen (ya sea subida o existente)
            return ResponseEntity.ok("Foto de perfil actualizada exitosamente");

        } catch (IOException | NoSuchAlgorithmException e) {
            return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
        }
    }

    public ResponseEntity<String> actualizarFotoPortada(MultipartFile file, String alias) {
        // Validaciones previas (opcional), como el tamaño o el tipo de archivo
        Optional<Usuario> usuarioOptional = usuarioRepository.findByAlias(alias);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.badRequest().body("No existe usuario con el alias: " + alias);
        }

        Usuario usuario = usuarioOptional.get();

        // Validar archivo (opcional)
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("El archivo está vacío");
        }

        if (!file.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body("El archivo debe ser una imagen");
        }

        try {
            // Subir la imagen a S3 (con la lógica de verificación de duplicados)
            String fileUrl = s3Service.uploadFile(file);

            // Actualizar la URL de la foto de perfil del usuario
            usuario.setFotoPortadaUrl(fileUrl);
            usuarioRepository.save(usuario);

            // Devolver la URL de la imagen (ya sea subida o existente)
            return ResponseEntity.ok("Foto de portada actualizada exitosamente");

        } catch (IOException | NoSuchAlgorithmException e) {
            return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
        }
    }


    public Optional<Usuario> buscarUsuarioPorId(String id) {
        return this.usuarioRepository.findById(id);
    }

    public List<Usuario> buscarTodosLosUsuarios() {
        List<Usuario> users = this.usuarioRepository.findAll();
        for(Usuario usuario : users){

            for(Instrumento instrumento : usuario.getMisInstru() ){
                System.out.println(instrumento.getNombre());
                System.out.println(instrumento.getTipoInstrumento());
            }
        }
        return users;
    }

    public Set<Usuario> buscarUsuarioPorTexto(String text) {

        if (text == null || text.isEmpty()) {
            return Collections.emptySet(); // O puedes lanzar una excepción según tu caso
        }
        Set<Usuario> usuarios = new HashSet<>();
        usuarios.addAll(usuarioRepository.findByNombre(text));
        usuarios.addAll(usuarioRepository.findByApellido(text));
        usuarios.addAll(usuarioRepository.findByAliasBrrBusqueda(text));
        return usuarios.stream().limit(5).collect(Collectors.toSet());
    }


    public void eliminarPorIdUsuario(String id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> buscarPorAlias(String alias) {
        return this.usuarioRepository.findByAlias(alias);
    }

    /*Solo actualizar nombre y apellido, solo testeo*/
    public Usuario actualizarNombreApellidoPorAlias(String alias, String nombre, String apellido) {
        Optional<Usuario> userOptional = usuarioRepository.findByAlias(alias);
        Usuario usuario = new Usuario();
        if (userOptional.isPresent()) {
             usuario = userOptional.get();
            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
        } else {
            throw new NoSuchElementException("Usuario no encontrado");
        }
        return usuarioRepository.save(usuario);
    }


    public Usuario actualizarUsuario(String id, Usuario user) {

        Optional<Usuario> userOptional = buscarUsuarioPorId(id);
        if (userOptional.isPresent()) {

            Usuario usuarioExistente = userOptional.get();

            if (user.getNombre() != null) {
                if(user.getNombre().matches("^[a-zA-Z]+$")){
                    usuarioExistente.setNombre(user.getNombre());
                }else if (user.getNombre().matches("^[a-zA-Z]+$") == false) { /*
                           El método matches evalúa cadenas según lo que le indiquemos.
                           En este caso, solo quiero que tenga letras minúsculas y mayúsculas*/
                    throw new IllegalArgumentException("El nombre solo puede contener letras.");
                }
            }
            if (user.getApellido() != null) {
                if(user.getApellido().matches("^[a-zA-Z]+$")){
                    usuarioExistente.setApellido(user.getApellido());
                }else if (user.getNombre().matches("^[a-zA-Z]+$") == false) {
                    throw new IllegalArgumentException("El apellido solo puede contener letras.");
                }
            }
            if (user.getAlias() != null) {
                if(user.getAlias().matches("^[a-zA-Z0-9]+$")){

                }else if (user.getAlias().matches("^[a-zA-Z0-9]+$") == false){
                    throw new IllegalArgumentException("El alias solo puede contener letras y números.");
                }
                usuarioExistente.setAlias(user.getAlias());
            }

            if(user.getEmail() != null){
                usuarioExistente.setEmail(user.getEmail());
            }
            if (user.getTelefono() != null) {
                if(user.getTelefono().matches("^[0-9]+$")){
                    usuarioExistente.setTelefono(user.getTelefono());
                }else if (user.getTelefono().matches("^[0-9]+$")) {
                    throw new IllegalArgumentException("El teléfono solo puede contener números.");
               }
            }
            if (user.getUbicacion() != null){
                usuarioExistente.setUbicacion(user.getUbicacion());
            }
            return this.usuarioRepository.save(usuarioExistente);
        }else{
            throw new RuntimeException("Usuario no encontrado con el ID: " + id);
        }
    }

    public void actualizarContrasena(String id, String contrasena) {

        Query query2 = new Query(Criteria.where("_id").is(id));
        Update update2 = new Update().set("contrasena",contrasena);
        mongoTemplate.updateFirst(query2, update2, Usuario.class);
    }

    public Boolean actualizarRedes(String id, Redes redes) {
        if(this.usuarioRepository.existsById(id)){
            Query query = new Query(Criteria.where("_id").is(id));
            Update update = new Update().set("redes",redes);
            mongoTemplate.updateFirst(query, update, Usuario.class);
            return true;
        }else{return false;}
    }

    public void actualizarDescripcion(String id, String descripcion){
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("descripcion",descripcion);
        mongoTemplate.updateFirst(query, update, Usuario.class);
    }

    public Usuario actualizarInstrumentosUsuario(String idInstrumento, String idUsuario) {
        Optional<Usuario> usuarioOptional = this.buscarUsuarioPorId(idUsuario);
        Optional<Instrumento> instrumentoOptional = instrumentoService.buscarInstrumentoPorId(idInstrumento);

        if (!usuarioOptional.isPresent()) {
            throw new IllegalArgumentException("No existe usuario con la id: " + idUsuario);
        }

        if (!instrumentoOptional.isPresent()) {
            throw new IllegalArgumentException("No existe instrumento con la id: " + idInstrumento);
        }

        Usuario usuario = usuarioOptional.get();
        Instrumento instrumento = instrumentoOptional.get();

        List<Instrumento> instrumentos = usuario.getMisInstru();
        if (instrumentos == null) {
            instrumentos = new ArrayList<>();
        }

        // Verifica si el instrumento ya está en la lista
        if (instrumentos.stream().noneMatch(instr -> instr.getId().equals(instrumento.getId()))) {
            instrumentos.add(instrumento);
        } else {
            throw new IllegalArgumentException("El instrumento: " + instrumento.getNombre() + " ya está asignado al usuario.");
        }

        usuario.setMisInstru(instrumentos);
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> buscarUsuariosPorInstrumentos(List<String> nombresInstrumentos) {
        return usuarioRepository.findAll().stream()
                .filter(usuario -> usuario.getMisInstru().stream()
                        .anyMatch(instr -> nombresInstrumentos.contains(instr.getNombre())))
                .collect(Collectors.toList());
    }

    public void actualizarMisIntereses(String id, List<String> intereses) {



    }

    public void crearPublicacion(String id, Publicacion publi) {
        Optional<Usuario> usu = usuarioRepository.findById(id);
        if(usu != null){
            Usuario usu2 = usu.get();
            usu2.getMisPublicaciones().add(publi);
            usuarioRepository.save(usu2);

        }
    }

    public void crearBanda(String idUsuario, Banda b) {
        Optional<Usuario> usu = usuarioRepository.findById(idUsuario);
        if(usu != null){
            Usuario usu2 = usu.get();
            usu2.getMisBandas().add(b);
            usuarioRepository.save(usu2);
        }
    }

    public void añadirMiembro(String idMiembro, Banda banda2) {
        Optional<Usuario> usu = usuarioRepository.findById(idMiembro);
        if(usu != null){
            Usuario usu2 = usu.get();
            usu2.getMisBandas().add(banda2);
            usuarioRepository.save(usu2);
        }
    }

    public void eliminarMiembro(String idUsuario, Banda banda2) {
        Optional<Usuario> usu = usuarioRepository.findById(idUsuario);
        if(usu != null){
            Usuario usu2 = usu.get();
            usu2.getMisBandas().remove(banda2);
            usuarioRepository.save(usu2);
        }
    }

    public List<Publicacion> misLikesUsuario(String usuarioAlias) {
        List<MeGusta> meGustaList = this.iMeGustaRepository.findMeGustaByIdAlias(usuarioAlias);
        List<String> publicacionIds = new ArrayList<>();
        for (MeGusta meGusta : meGustaList){
            publicacionIds.add(meGusta.getPublicacionId());
        }
        return this.iPublicacionRepository.findAllById(publicacionIds);
    }
}
