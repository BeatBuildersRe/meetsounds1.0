package com.project.meetsounds.repositories;

import com.project.meetsounds.domain.models.Publicacion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPublicacionRepository extends MongoRepository<Publicacion, String> {
}
