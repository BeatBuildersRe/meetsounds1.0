package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Instrumento;
import com.project.meetsounds.domain.models.Redes;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private InstrumentoService instrumentoService;

    public Usuario guardarUsuario(Usuario user) {

        user.setC_seguidores(0);
        user.setC_seguidos(0);
        //Generar Fecha
        LocalDate fechaActual = LocalDate.now();
        int year = fechaActual.getYear();
        int mes = fechaActual.getMonthValue();
        int dia = fechaActual.getDayOfMonth();
        user.setDate(LocalDate.of(year, mes, dia));
        //Encriptar contraseña

        // Generar Alias
        //user.setAlias(String.valueOf(UUID.randomUUID()));

        if (this.buscarPorAlias(user.getAlias()) == null){ //Si no se encuentra ningun usuario con el mismo alias, el usuario se crea.
            return usuarioRepository.save(user);
        }else {
            throw new IllegalArgumentException("El alias " + user.getAlias() + " ya existe.");
        }
    } // Hay que actualizar este metodo de un modo parecido al de actualizarUsuario

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

    public List<Usuario> buscarUsuarioPorTexto(String text) {
        List<Usuario> usuarios = new ArrayList<>();
        usuarios.addAll(this.usuarioRepository.findByNombre(text));
        usuarios.addAll(this.usuarioRepository.findByApellido(text));
        return usuarios;
    }

    public void eliminarPorIdUsuario(String id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario buscarPorAlias(String alias) {
        return this.usuarioRepository.findByAlias(alias);
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
}
