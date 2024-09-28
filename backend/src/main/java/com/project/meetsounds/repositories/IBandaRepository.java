package com.project.meetsounds.repositories;

import com.project.meetsounds.domain.models.Banda;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBandaRepository extends MongoRepository<Banda, String> {

    @Query(value = "{nombre: {$regex:?0}}")
    List<Banda> listarPorNombre(String nombre);
}
