package com.project.meetsounds.repositories;

import com.project.meetsounds.domain.models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByNombre(String text);
    List<Usuario> findByApellido(String text);
    Usuario findByAlias(String alias);
}
