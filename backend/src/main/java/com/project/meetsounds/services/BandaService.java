package com.project.meetsounds.services;

import com.project.meetsounds.domain.models.Banda;
import com.project.meetsounds.domain.models.Usuario;
import com.project.meetsounds.repositories.IBandaRepository;
import com.project.meetsounds.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BandaService {

    @Autowired
    private IBandaRepository iBandaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public List<Banda> listarBandas() {
        return iBandaRepository.findAll();
    }

    public List<Banda> listarPorNombre(String nombreBanda) {
        return iBandaRepository.listarPorNombre(nombreBanda);
    }

    public Optional<Banda> buscarBandaPorId(String idBanda) {
        return iBandaRepository.findById(idBanda);
    }

    public Optional<Banda> buscarBandaPorNombre(String nombre){
        return iBandaRepository.findByNombreBanda(nombre);
    }
    public Banda crearBanda(String idUsuario, Banda bandaInput) {

        // Aquí `banda` ya tiene los IDs de los miembros en la lista `miembros`
        Banda banda = new Banda();
        banda.setNombreBanda(bandaInput.getNombreBanda());
        banda.setDescripcion(bandaInput.getDescripcion());
        banda.setIdCreador(idUsuario);
        if (banda.getMiembros() == null || banda.getMiembros().isEmpty()) {
            banda.setMiembros(List.of(idUsuario));
        }
        return iBandaRepository.save(banda);
    }

    public void eliminarBanda(String id){
        iBandaRepository.deleteById(id);
    }

    public void actualizarDescripcion(String idBanda, String descripcion) {
        Query query = new Query(Criteria.where("_id").is(idBanda));
        Update update = new Update().set("descripcion",descripcion);
        mongoTemplate.updateFirst(query, update, Banda.class);
    }

    public void anadirMiembros(String nombreBanda, List<String> idUsuarios) {
        Optional<Banda> banda = this.buscarBandaPorNombre(nombreBanda);
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

    public void abandonarBanda(String idBanda, String idAlias) {
        try {
            Optional<Banda> bandaOptional = this.iBandaRepository.findById(idBanda);
            Banda banda = bandaOptional.get();


            //Cada usuario tiene la lista de Bandas a la que pertenece, por eso hay que traer las
            // listas de todos los usuarios que pertenecen a la banda para actualizar todas sus listas.
            for (String idAliasUsuario : banda.getMiembros()){
                try {
                    Optional<Usuario> usuarioOptional = this.usuarioService.buscarPorAlias(idAliasUsuario);
                    Usuario usuario = usuarioOptional.get();

                    // Trae la lista de bandas de cada usuario y elimina el usuario que salio de la banda.
                    usuario.getMisBandas().removeIf(b -> b.getMiembros().stream().anyMatch(u -> u.equals(idAlias)));
                    this.iUsuarioRepository.save(usuario);

                }catch (NullPointerException n){
                    System.out.println("NullPointer BandaService: Metodo abandonarBanda");
                }
            }

            banda.getMiembros().remove(idAlias);
            this.iBandaRepository.save(banda);

        }catch (NullPointerException nullPointerException){
            System.out.println("NullPointerExeption - BandaService - BandaOptional");
        }

    }
}
