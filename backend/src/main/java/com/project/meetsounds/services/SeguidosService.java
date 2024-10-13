package com.project.meetsounds.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.meetsounds.domain.models.Seguido;
import com.project.meetsounds.repositories.ISeguirRepository;


@Service
public class SeguidosService {

    @Autowired
    private ISeguirRepository iSeguirRepository;

    public void seguirUsuario(String idUsuario, String idSeguir) {
        Seguido seguido = iSeguirRepository.findByidUsuario(idUsuario);
        List<String> misSeguidos = new ArrayList<>();
        misSeguidos.add(idSeguir);
        seguido.setMisSeguidos(misSeguidos);
        iSeguirRepository.save(seguido);
    }

}
