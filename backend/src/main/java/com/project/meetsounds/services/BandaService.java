package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Banda;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.IBandaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BandaService {

    @Autowired
    private IBandaRepository iBandaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private MongoTemplate mongoTemplate;



    public List<Banda> listarBandas() {
        return iBandaRepository.findAll();
    }

    public List<Banda> listarPorNombre(String nombre) {
        return iBandaRepository.listarPorNombre(nombre);
    }

    public Optional<Banda> buscarBandaPorId(String idBanda) {
        return iBandaRepository.findById(idBanda);
    }

    public Banda crearBanda(String nombreBanda, String idUsuario) {
        Banda banda = new Banda();
        banda.setNombreBanda(nombreBanda);
        banda.setIdCreador(idUsuario);
        List<String> miembros = new ArrayList<>();
        miembros.add(idUsuario);
        banda.setMiembros(miembros);
        Banda b = iBandaRepository.save(banda);
        usuarioService.crearBanda(idUsuario, b);
        return b;
    }

    public void actualizarDescripcion(String idBanda, String descripcion) {
        Query query = new Query(Criteria.where("_id").is(idBanda));
        Update update = new Update().set("descripcion",descripcion);
        mongoTemplate.updateFirst(query, update, Banda.class);
    }

    public void añadirMiembros(String idBanda, List<String> idUsuarios) {
        Optional<Banda> banda = iBandaRepository.findById(idBanda);
        if(banda != null){
            Banda banda2 = banda.get();
            for(String idMiembro : idUsuarios){
                banda2.getMiembros().add(idMiembro);
                usuarioService.añadirMiembro(idMiembro, banda2);
                iBandaRepository.save(banda2);
            }
        }
    }

    public void eliminarMiembro(String idBanda, String idUsuario) {
        Optional<Banda> banda = iBandaRepository.findById(idBanda);
        if(banda != null){
            Banda banda2 = banda.get();
            banda2.getMiembros().remove(idUsuario);
            usuarioService.eliminarMiembro(idUsuario, banda2);
            iBandaRepository.save(banda2);
        }
    }
}
