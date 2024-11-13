import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegComment, FaRegHeart, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { IconButton, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {BASE_URL} from '../../config'


export default function Publicacion({ publicacion, fetchUsuario, usuarios, onPublicacionEliminada }) {
  const [publicacionEliminada, setPublicacionEliminada] = useState(false);  // Definición del estado
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDuenoPublicacion, setIsDuenoPublicacion] = useState(false);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  const [cantidadComentarios, setCantidadComentarios] = useState(5);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [meGustaStatus, setMeGustaStatus] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenDimensiones, setImagenDimensiones] = useState({ width: 0, height: 0 });

  const getAliasFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const aliasCookie = cookies.find(cookie => cookie.startsWith('alias='));
    return aliasCookie ? aliasCookie.split('=')[1] : null;
  };

  const usuarioAlias = getAliasFromCookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    verificarMeGusta();
    comprobarEsDuenoPublicacion();
    if (publicacion.mediaUrl) {
      const img = new Image();
      img.onload = () => {
        setImagenDimensiones({ width: img.width, height: img.height });
      };
      img.src = publicacion.mediaUrl;
    }
  }, []);

  const comprobarEsDuenoPublicacion = async () => {
    try {
      const response = await fetch(`${BASE_URL}/comprobarEsDuenoPublicacion?idPublicacion=${publicacion.id}&usuarioAlias=${usuarioAlias}`);
      if (response.ok) {
        const result = await response.json();
        setIsDuenoPublicacion(result);
      }
    } catch (error) {
      console.error('Error al comprobar si es dueño de la publicación:', error);
    }
  };



  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalAbierto]);

  const verificarMeGusta = async () => {
    const response = await fetch(`${BASE_URL}/usuarioHaDadoMeGusta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion: publicacion.id,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      const result = await response.json();
      setMeGustaStatus(result);
    }
  };

  const manejarMeGusta = async (e) => {
    e.stopPropagation();
    const url = meGustaStatus ? `${BASE_URL}/quitarMeGusta` : `${BASE_URL}/darMeGusta`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        idPublicacion: publicacion.id,
        usuarioAlias,
      }).toString(),
    });

    if (response.ok) {
      setMeGustaStatus(!meGustaStatus);
      publicacion.count_likes = meGustaStatus ? publicacion.count_likes - 1 : publicacion.count_likes + 1;
    }
  };

  const verMasComentarios = useCallback((e) => {
    e.stopPropagation();
    setCantidadComentarios(prevCantidad => prevCantidad + 5);
  }, []);

  const verMenosComentarios = useCallback((e) => {
    e.stopPropagation();
    setCantidadComentarios(prevCantidad => Math.max(prevCantidad - 5, 5));
  }, []);

  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value);
  };

  const enviarComentario = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/Comentar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        publicacionId: publicacion.id,
        idAliasUsuario: usuarioAlias,
        text: nuevoComentario,
      }).toString(),
    });

    if (response.ok) {
      const comentario = {
        comentario: nuevoComentario,
        idAliasUsuario: usuarioAlias,
        fechaEnvio: new Date().toISOString(),
      };
      publicacion.comentarios.push(comentario);
      publicacion.count_coment = publicacion.count_coment + 1;
      setNuevoComentario('');
    }
  };

  const irAlPerfil = (e, alias) => {
    e.stopPropagation();
    navigate(`/perfil-encontrado2/${alias}`);
  };

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = (e) => {
    e.stopPropagation();
    setModalAbierto(false);
    setCantidadComentarios(5);
  };

  function autoResize(event) {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  const getImageStyle = () => {
    const { width, height } = imagenDimensiones;
    if (width === height) {
      return styles.imageSquare;
    } else if (width > height) {
      return styles.imageHorizontal;
    } else {
      return styles.imageVertical;
    }
  };
  const paddingValue = '20px';
  const styles = {
    containerPublicaciones: {
      width:'100%',
      borderRadius: '25px',
      padding: '25px',
      marginBottom: '15px',
      backgroundColor: 'var(--color-contenedores)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    headerconBoton: {
      display: 'flex',
      justifyContent:'space-between',
      alignItems: 'center',
      width:'100%',
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      marginRight: '12px',
      cursor: 'pointer',
    },
    userName: {
      color:'var(--color-texto-normal)',
      fontWeight: 'bold',
      marginRight: '8px',
      cursor: 'pointer',
    },
    userHandle: {
      color: '#6e767d',
      marginRight: '8px',
    },
    dot: {
      color: '#6e767d',
      marginRight: '8px',
    },
    content: {
      marginBottom: '12px',
      fontSize: '15px',
      lineHeight: '20px',
      wordWrap: 'break-word',
    },
    imageSquare: {
      width: '100%',
      height: 'auto',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: '8px',
      marginTop: '12px',
      cursor: 'pointer',
    },
    imageVertical: {
      width: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '8px',
      marginTop: '12px',
      cursor: 'pointer',
    },
    imageHorizontal: {
      width: '100%',
      height: 'auto',
      maxHeight: '300px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginTop: '12px',
      cursor: 'pointer',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: '12px',
    },
    modalActions:{
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: '12px',
    },
    actionButton: {
      background: 'none',
      border: 'none',
      color: '#6e767d',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px',
    },
    actionIcon: {
      fontSize: '25px',
      color:'var(--color-texto-normal)',
    },
    actionText: {
      marginLeft: '4px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'var(--color-contenedores)',
      borderRadius: '16px',
      maxWidth: '90%',
      height: '90vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    },
    modalContentNoImage: {
      backgroundColor: 'var(--color-contenedores)',
      borderRadius: '16px',
      width: '90%',
      height: '90vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    },
    modalImage: {
      width: '60%',
      height: '100%',
      objectFit: 'cover',
    },
    modalSidebar: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    modalSidebarNoImage: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    },
    modalHeader: {
      padding: paddingValue,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    modalHeaderNoImage: {
      padding: paddingValue,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      width: '50%',
    },
    modalComments: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      color:'var(--color-texto-normal)',
    },
    modalFooter: {
      padding: paddingValue,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 1,
    },
    commentForm: {
      marginTop: '16px',
      border:'none',
      width: '100%',
      
    },
    commentInput: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'var(--color-contenedores)',
      border:'none',
      fontFamily:'var(--fuente-Montserrat)',
      color:'var(--color-texto-normal)',
      resize: 'none',
      minHeight: '20px',
      height: 'auto',
      overflow: 'hidden',
      outline: 'none',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      padding:'20px',
    },
    commentButton: {
      padding: '8px 16px',
      backgroundColor: '#1da1f2',
      color: '#ffffff',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    commentsList: {
      marginTop: '16px',
      width: '100%',
    },
    comment: {
      borderBottom: '1px solid #2f3336',
      padding: '12px 0',
      wordWrap: 'break-word',
    },
    commentHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4px',
    },
    commentUser: {
      fontWeight: 'bold',
      marginRight: '8px',
    },
    commentDate: {
      color: '#6e767d',
      fontSize: '14px',
    },
    headerinfousuario:{
      display:'flex',
      flexDirection: 'column',
    },
    commentActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
    },
  };

  const renderComentarios = () => (
    <div style={styles.commentsList}>
      {publicacion.comentarios.slice(0, cantidadComentarios).map((comentario, idx) => (
        <div key={idx} style={styles.comment}>
          <div style={styles.commentHeader}>
            <span style={styles.commentUser}>{comentario.idAliasUsuario}</span>
            <span style={styles.commentDate}>{new Date(comentario.fechaEnvio).toLocaleString()}</span>
          </div>
          <p>{comentario.comentario}</p>
        </div>
      ))}
      <div style={styles.commentActions}>
        {cantidadComentarios < publicacion.comentarios.length && (
          <button onClick={verMasComentarios} style={styles.commentButton}>
            Ver más comentarios
          </button>
        )}
        {cantidadComentarios > 5 && (
          <button onClick={verMenosComentarios} style={styles.commentButton}>
            Ver menos comentarios
          </button>
        )}
      </div>
    </div>
  );

  const renderModalContent = () => (
    <div style={publicacion.mediaUrl ? styles.modalContent : styles.modalContentNoImage} onClick={(e) => e.stopPropagation()}>
      <button style={styles.backButton} onClick={cerrarModal}>
        <FaArrowLeft />
      </button>
      {publicacion.mediaUrl ? (
        <>
          <img src={publicacion.mediaUrl} alt="Publicación" style={styles.modalImage} />
          <div style={styles.modalSidebar}>
            <div style={styles.modalHeader}>
            <div style={styles.headerconBoton}>
        <div style={styles.header}>
        <img
          src={usuarios[publicacion.idUsuario]?.fotoPerfilUrl || '/default-profile.png'}
          alt="Usuario"
          style={styles.avatar}
          onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}
        />
        <div style={styles.headerinfousuario}>
          <span style={styles.userName} onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}>
            {usuarios[publicacion.idUsuario]?.nombre} {usuarios[publicacion.idUsuario]?.apellido}
          </span>
          <span style={styles.userHandle}>@{usuarios[publicacion.idUsuario]?.alias}</span>
        </div>
        </div>
        
        <div style={styles.botonEliminar}>
      {isDuenoPublicacion && (
              <IconButton
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
              <button onClick={handleEliminarPublicacion}>Eliminar</button>
            {publicacionEliminada && <p>Publicación eliminada.</p>}  
              </MenuItem>
            </Menu>
        
      </div>
      </div>
              <p>{publicacion.descripcion}</p>
            </div>
            <div style={styles.modalComments}>
              {renderComentarios()}
            </div>
            <div style={styles.modalFooter}>
              <div style={styles.modalActions}>
                <button style={styles.actionButton} onClick={manejarMeGusta}>
                  {meGustaStatus ? <FaHeart style={{...styles.actionIcon, color: "#e0245e"}} /> : <FaRegHeart style={styles.actionIcon} />}
                  <span style={styles.actionText}>{publicacion.count_likes}</span>
                </button>
                <button style={styles.actionButton}>
                  <FaRegComment style={styles.actionIcon} />
                  <span style={styles.actionText}>{publicacion.count_coment}</span>
                </button>
              </div>
              <form style={styles.commentForm} onSubmit={enviarComentario}>
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={nuevoComentario}
                  onChange={handleComentarioChange}
                  style={{
                    ...styles.commentInput,
                    height: nuevoComentario ? 'auto' : '20px',
                  }}
                  rows={nuevoComentario ? 'auto' : '1'}
                />
                {nuevoComentario.trim() && (
                  <button type="submit" style={styles.commentButton}>
                    Comentar
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={styles.modalHeaderNoImage}>
            <div style={styles.header}>
              <img
                src={usuarios[publicacion.idUsuario]?.fotoPerfilUrl || '/default-profile.png'}
                alt="Usuario"
                style={styles.avatar}
                onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}
              />
              <div style={styles.headerinfousuario}>
                <span style={styles.userName} onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}>
                  {usuarios[publicacion.idUsuario]?.nombre} {usuarios[publicacion.idUsuario]?.apellido}
                </span>
                <span style={styles.userHandle}>@{usuarios[publicacion.idUsuario]?.alias}</span>
              </div>
            </div>
            <p>{publicacion.descripcion}</p>
            <div style={styles.modalActions}>
              <button style={styles.actionButton} onClick={manejarMeGusta}>
                {meGustaStatus ? <FaHeart style={{...styles.actionIcon, color: "#e0245e"}} /> : <FaRegHeart style={styles.actionIcon} />}
                <span style={styles.actionText}>{publicacion.count_likes}</span>
              </button>
              <button style={styles.actionButton}>
                <FaRegComment style={styles.actionIcon} />
                <span style={styles.actionText}>{publicacion.count_coment}</span>
              </button>
            </div>
          </div>
          <div style={styles.modalSidebarNoImage}>
            <div style={styles.modalComments}>
              {renderComentarios()}
            </div>
            <div style={styles.modalFooter}>
              <form style={styles.commentForm} onSubmit={enviarComentario}>
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={nuevoComentario}
                  onChange={handleComentarioChange}
                  style={{
                    ...styles.commentInput,
                    height: nuevoComentario ? 'auto' : '20px',
                  }}
                  rows={nuevoComentario ? 'auto' : '1'}
                />
                {nuevoComentario.trim() && (
                  <button type="submit" style={styles.commentButton}>
                    Comentar
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const handleEliminarPublicacion = async () => {
    try {
      // Realizar la solicitud DELETE al endpoint
      const response = await fetch(`${BASE_URL}/eliminarPublicacionPorId?idAlias=${usuarioAlias}&idPublicacion=${publicacion.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Publicación eliminada con éxito');
        setPublicacionEliminada(true);
        
        // Llamada al callback (si existe) para manejar la eliminación
        if (onPublicacionEliminada) {
          onPublicacionEliminada(publicacion.id);
        }
  
        // Recargar la página después de eliminar la publicación
        window.location.reload();  // Recarga la página
      } else {
        // Si la respuesta no es ok, podemos considerar que hubo un problema
        console.log('Error al eliminar la publicación');
        setPublicacionEliminada(false);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de eliminación:', error);
    } finally {
      handleClose(); // Cerramos el menú si se abrió
    }
  };


  return (
    <div style={styles.containerPublicaciones}>

      <div style={styles.headerconBoton}>
        <div style={styles.header}>
        <img
          src={usuarios[publicacion.idUsuario]?.fotoPerfilUrl || '/default-profile.png'}
          alt="Usuario"
          style={styles.avatar}
          onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}
        />
        <div style={styles.headerinfousuario}>
          <span style={styles.userName} onClick={(e) => irAlPerfil(e, usuarios[publicacion.idUsuario]?.alias)}>
            {usuarios[publicacion.idUsuario]?.nombre} {usuarios[publicacion.idUsuario]?.apellido}
          </span>
          <span style={styles.userHandle}>@{usuarios[publicacion.idUsuario]?.alias}</span>
        </div>
        </div>
        
        <div style={styles.botonEliminar}>
      {isDuenoPublicacion && (
              <IconButton
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
              <button onClick={handleEliminarPublicacion}>Eliminar</button>
            {publicacionEliminada && <p>Publicación eliminada.</p>}  
              </MenuItem>
            </Menu>
        
      </div>
      </div>
      <div style={styles.content}>
        <p>{publicacion.descripcion}</p>
        {publicacion.mediaUrl && (
          <img 
            src={publicacion.mediaUrl} 
            alt="Publicación" 
            style={getImageStyle()}
            onClick={abrirModal}
          />
        )}
      </div>
      <div style={styles.actions}>
        <button style={styles.actionButton} onClick={manejarMeGusta}>
          {meGustaStatus ? <FaHeart style={{...styles.actionIcon, color: "#e0245e"}} /> : <FaRegHeart style={styles.actionIcon} />}
          <span style={styles.actionText}>{publicacion.count_likes}</span>
        </button>
        <button style={styles.actionButton} onClick={abrirModal}>
          <FaRegComment style={styles.actionIcon} />
          <span style={styles.actionText}>{publicacion.count_coment}</span>
        </button>
      </div>
      <form style={styles.commentForm} onSubmit={enviarComentario}>
        <textarea
          placeholder="Escribe tu comentario..."
          value={nuevoComentario}
          onChange={handleComentarioChange}
          onInput={autoResize}
          style={{
            ...styles.commentInput,
            height: nuevoComentario ? 'auto' : '20px',
          }}
          rows={nuevoComentario ? 'auto' : '1'}
        />
        {nuevoComentario.trim() && (
          <button type="submit" style={styles.commentButton}>
            Comentar
          </button>
        )}
      </form>
      {modalAbierto && (
        <div style={styles.modal} onClick={cerrarModal}>
          {renderModalContent()}
        </div>
      )}
    </div>
  );
}