package com.project.meetsounds.repositories;

import com.project.meetsounds.domain.models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByNombre(String text);
    List<Usuario> findByApellido(String text);
    Optional<Usuario> findByAlias(String alias);
    Optional<Usuario> findByEmail(String email);
}
