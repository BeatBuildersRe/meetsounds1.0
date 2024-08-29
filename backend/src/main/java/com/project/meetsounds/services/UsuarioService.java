package com.project.meetsounds.services;

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

@Service
public class UsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;


    @Autowired
    private MongoTemplate mongoTemplate;

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

        if (this.buscarPorAlias(user.getAlias()) != null){
            return usuarioRepository.save(user);
        }else {
            throw new IllegalArgumentException("El alias " + user.getAlias() + " ya existe.");
        }
    }

    public Optional<Usuario> findByIdUser(String id) {
        return this.usuarioRepository.findById(id);
    }

    public List<Usuario> findAllUser() {
        //List<Usuario> users = this.usuarioRepository.findAll();
        //users.forEach(user -> System.out.println(user.getNombre()));
        return usuarioRepository.findAll();
    }

    public List<Usuario> findByText(String text) {
        List<Usuario> usuarios = new ArrayList<>();
        usuarios.addAll(this.usuarioRepository.findByNombre(text));
        usuarios.addAll(this.usuarioRepository.findByApellido(text));
        return usuarios;
    }

    public void deleteByIdUser(String id) {
        this.deleteByIdUser(id);
    }

    public Usuario buscarPorAlias(String alias) {
        return this.usuarioRepository.findByAlias(alias);
    }

    public Usuario updateUser(Usuario user) {
        return this.usuarioRepository.save(user);
    }

    public void actualizarContrasena(String id, String contrasena) {

        Query query2 = new Query(Criteria.where("_id").is(id));
        Update update2 = new Update().set("contrasena",contrasena);
        mongoTemplate.updateFirst(query2, update2, Usuario.class);
    }

    public Boolean actulizarRedes(String id, Redes redes) {
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
}
