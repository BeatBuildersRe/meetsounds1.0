// GeneroMusicalService.java
package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.GeneroMusical;
import com.project.meetsounds.repositories.IGeneroMusicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GeneroMusicalService {

    @Autowired
    private IGeneroMusicalRepository generoMusicalRepository;

    public Optional<GeneroMusical> buscarGeneroPorId(String id) {
        return generoMusicalRepository.findById(id);
    }

    public List<GeneroMusical> traerTodosLosGeneros() {
        return generoMusicalRepository.findAll();
    }

    public GeneroMusical guardarGenero(GeneroMusical genero) {
        return generoMusicalRepository.save(genero);
    }
    
    public void eliminarGeneroPorId(String id) {
        generoMusicalRepository.deleteById(id);
    }
}
