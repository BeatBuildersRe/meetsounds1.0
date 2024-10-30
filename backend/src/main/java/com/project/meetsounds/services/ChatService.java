package com.project.meetsounds.services;


import com.project.meetsounds.domain.models.Chat;
import com.project.meetsounds.domain.models.Mensaje;
import com.project.meetsounds.repositories.IChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private IChatRepository iChatRepository;

    public Chat iniciarChat(String idUsuario1, String idUsuario2) {
        //Busca si existe un chat entre los dos usuarios
        return iChatRepository.findByIdUsuario1AndIdUsuario2(idUsuario1, idUsuario2)
                .or(() -> iChatRepository.findByIdUsuario2AndIdUsuario1(idUsuario1, idUsuario2))
                .orElseGet(() -> {
                    Chat nuevoChat = new Chat();
                    nuevoChat.setIdUsuario1(idUsuario1);
                    nuevoChat.setIdUsuario2(idUsuario2);
                    nuevoChat.setMensajes(new ArrayList<>());
                    return iChatRepository.save(nuevoChat);
                });
    }

    public void guardarMensaje(String chatId, Mensaje mensaje) {
        // Busca el chat por ID y agrega el mensaje
        Optional<Chat> chatOpt = iChatRepository.findById(chatId);
        chatOpt.ifPresent(chat -> {
            chat.getMensajes().add(mensaje);
            iChatRepository.save(chat);
        });
    }

    public Chat buscarChatPorId(String id){
        Optional<Chat> chatOptional = iChatRepository.findById(id);
        Chat chat= new Chat();
        if (chatOptional.isPresent()){
            chat = chatOptional.get();
        }
        return chat;
    }

    public List<Chat> traerTodosLosChats(){
        return iChatRepository.findAll();
    }
}
