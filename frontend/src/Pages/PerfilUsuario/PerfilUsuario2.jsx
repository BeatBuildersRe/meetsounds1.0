// import React, { useState } from 'react'
// import { Dialog } from '@headlessui/react'
// import { CalendarIcon, CameraIcon } from 'lucide-react'

// const styles = {
//   container: {
//     minHeight: '100vh',
//     backgroundColor: '#1a202c',
//     color: 'white',
//     marginLeft:'18vw',
//     width:'100%'
//   },
//   header: {
//     padding: '1rem',
//     display: 'flex',
//     alignItems: 'center',
//     borderBottom: '1px solid #2d3748',
//   },
//   backButton: {
//     marginRight: '1rem',
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   headerTitle: {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//   },
//   profileInfo: {
//     position: 'relative',
//   },
//   coverImage: {
//     width: '100%',
//     height: '15rem',
//     objectFit: 'cover',
//   },
//   profileImage: {
//     position: 'absolute',
//     left: '1rem',
//     bottom: '-4rem',
//     width: '8rem',
//     height: '8rem',
//     borderRadius: '50%',
//     border: '4px solid #1a202c',
//   },
//   profileContent: {
//     marginTop: '5rem',
//     padding: '0 1rem',
//   },
//   editButton: {
//     padding: '0.5rem 1rem',
//     border: '1px solid #4a5568',
//     borderRadius: '9999px',
//     fontWeight: 'bold',
//     backgroundColor: 'transparent',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   profileName: {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//     marginTop: '1rem',
//   },
//   profileUsername: {
//     color: '#a0aec0',
//   },
//   joinDate: {
//     display: 'flex',
//     alignItems: 'center',
//     marginTop: '0.5rem',
//     color: '#a0aec0',
//   },
//   followInfo: {
//     display: 'flex',
//     marginTop: '1rem',
//     gap: '1rem',
//   },
//   tabs: {
//     display: 'flex',
//     borderBottom: '1px solid #2d3748',
//     marginTop: '1rem',
//   },
//   tab: {
//     flex: 1,
//     textAlign: 'center',
//     padding: '1rem 0',
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   activeTab: {
//     borderBottom: '2px solid #4299e1',
//   },
//   modal: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 50,
//   },
//   modalContent: {
//     backgroundColor: '#2d3748',
//     padding: '1.5rem',
//     borderRadius: '0.5rem',
//     width: '100%',
//     maxWidth: '28rem',
//   },
//   modalTitle: {
//     fontSize: '1.25rem',
//     fontWeight: 'medium',
//     marginBottom: '1rem',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.5rem',
//   },
//   label: {
//     fontSize: '0.875rem',
//     color: '#a0aec0',
//   },
//   input: {
//     padding: '0.5rem',
//     backgroundColor: '#4a5568',
//     border: '1px solid #2d3748',
//     borderRadius: '0.25rem',
//     color: 'white',
//   },
//   fileUpload: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '1rem',
//     border: '2px dashed #4a5568',
//     borderRadius: '0.25rem',
//   },
//   buttonGroup: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '0.5rem',
//     marginTop: '1rem',
//   },
//   button: {
//     padding: '0.5rem 1rem',
//     borderRadius: '0.25rem',
//     fontWeight: 'medium',
//     cursor: 'pointer',
//   },
//   cancelButton: {
//     backgroundColor: '#4a5568',
//     color: 'white',
//     border: 'none',
//   },
//   saveButton: {
//     backgroundColor: '#4299e1',
//     color: 'white',
//     border: 'none',
//   },
// }

// export default function ProfilePage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [profile, setProfile] = useState({
//     name: 'emiliano .arias',
//     username: '@emilian64748769',
//     joinDate: 'August 2024',
//     following: 1,
//     followers: 0,
//     posts: 0,
//     profilePicture: 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/IRquU3u3hhuNCpxPUvzSK7UUdErZMFxyYTztt9a9.jpeg/thumb?height=400&width=400',
//     coverPicture: 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/4IiAIlLm0ZOgjBTNgm29Hvwy2dgNJkpFL45nsMAC.jpeg/thumb?height=300&width=600',
//   })

//   const handleEditProfile = (e) => {
//     e.preventDefault()
//     // Aquí iría la lógica para actualizar el perfil
//     setIsModalOpen(false)
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <button style={styles.backButton}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M19 12H5M12 19l-7-7 7-7"/>
//           </svg>
//         </button>
//         <h1 style={styles.headerTitle}>{profile.name}</h1>
//       </header>

//       {/* Profile Info */}
//       <div style={styles.profileInfo}>
//         <img src={profile.coverPicture} alt="Cover" style={styles.coverImage} />
//         <img src={profile.profilePicture} alt="Profile" style={styles.profileImage} />
//       </div>

//       <div style={styles.profileContent}>
//         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <button onClick={() => setIsModalOpen(true)} style={styles.editButton}>
//             Edit profile
//           </button>
//         </div>

//         <h2 style={styles.profileName}>{profile.name}</h2>
//         <p style={styles.profileUsername}>{profile.username}</p>

//         <div style={styles.joinDate}>
//           <CalendarIcon style={{marginRight: '0.5rem'}} />
//           <span>Joined {profile.joinDate}</span>
//         </div>

        // <div style={styles.followInfo}>
        //   <span><strong>{profile.following}</strong> Following</span>
        //   <span><strong>{profile.followers}</strong> Followers</span>
        // </div>
//       </div>

//       {/* Tabs */}
//       <nav style={styles.tabs}>
//         {['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'].map((tab) => (
//           <button key={tab} style={{...styles.tab, ...(tab === 'Posts' ? styles.activeTab : {})}}>
//             {tab}
//           </button>
//         ))}
//       </nav>

//       {/* Edit Profile Modal */}
//       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div style={styles.modal}>
//           <Dialog.Panel style={styles.modalContent}>
//             <Dialog.Title as="h3" style={styles.modalTitle}>
//               Edit Profile
//             </Dialog.Title>
//             <form onSubmit={handleEditProfile} style={styles.form}>
              // <div style={styles.formGroup}>
              //   <label htmlFor="name" style={styles.label}>Name</label>
              //   <input type="text" id="name" name="name" defaultValue={profile.name} style={styles.input} />
              // </div>
              // <div style={styles.formGroup}>
              //   <label htmlFor="username" style={styles.label}>Username</label>
              //   <input type="text" id="username" name="username" defaultValue={profile.username} style={styles.input} />
              // </div>
              // <div style={styles.formGroup}>
              //   <label htmlFor="gender" style={styles.label}>Gender</label>
              //   <select id="gender" name="gender" style={styles.input}>
              //     <option>Male</option>
              //     <option>Female</option>
              //     <option>Other</option>
              //   </select>
              // </div>
              // <div style={styles.formGroup}>
              //   <label htmlFor="birthdate" style={styles.label}>Birth Date</label>
              //   <input type="date" id="birthdate" name="birthdate" style={styles.input} />
              // </div>
              // <div style={styles.formGroup}>
              //   <label style={styles.label}>Profile Picture</label>
              //   <div style={{display: 'flex', alignItems: 'center'}}>
              //     <span style={{width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#4a5568', marginRight: '1rem'}}></span>
              //     <button type="button" style={{...styles.button, ...styles.cancelButton}}>
              //       Change
              //     </button>
              //   </div>
              // </div>
              // <div style={styles.formGroup}>
              //   <label style={styles.label}>Cover Picture</label>
              //   <div style={styles.fileUpload}>
              //     <CameraIcon style={{width: '3rem', height: '3rem', color: '#a0aec0', marginBottom: '0.5rem'}} />
              //     <div style={{fontSize: '0.875rem', color: '#a0aec0'}}>
              //       <label htmlFor="file-upload" style={{color: '#4299e1', cursor: 'pointer'}}>
              //         Upload a file
              //       </label>
              //       <input id="file-upload" name="file-upload" type="file" style={{display: 'none'}} />
              //       <span> or drag and drop</span>
              //     </div>
              //     <p style={{fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.5rem'}}>
              //       PNG, JPG, GIF up to 10MB
              //     </p>
              //   </div>
              // </div>
//               <div style={styles.buttonGroup}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={{...styles.button, ...styles.cancelButton}}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={{...styles.button, ...styles.saveButton}}>
//                   Save
//                 </button>
//               </div>
//             </form>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   )
// }






import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { CalendarIcon, CameraIcon } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FcAudioFile, FcCamera, FcAlphabeticalSortingAz, FcFilmReel, FcGallery, FcMusic, FcPlus } from "react-icons/fc"
import MenuListComposition from '../../components/mini-menu/minMenu'
import CrearPublicacion from '@c/Crear-Publicacion/CrearPublicacion'
import SeguirDores from '@c/seguir_dores'
import MenuDerecho from '@c/Menu/Menu'
import { BASE_URL } from '../../config'

const imgFondoDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=200&width=600' // Imagen de fondo predeterminada
const imgPerfilDefault = 'https://imagedelivery.net/WS9ABFRS6TfdqDudkFOT3w/grrraphic/previews/j6RAX7eRw0pyywtdOXK38whWXLrEmjDWb7Z6l54u.jpeg/thumb?height=400&width=400' // Imagen de perfil predeterminada

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a202c',
    color: 'white',
    marginLeft:'18vw',
    width:'100%'
  },
  header: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #2d3748',
  },
  backButton: {
    marginRight: '1rem',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  profileInfo: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '15rem',
    objectFit: 'cover',
  },
  profileImage: {
    position: 'absolute',
    left: '1rem',
    bottom: '-4rem',
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    border: '4px solid #1a202c',
  },
  profileContent: {
    marginTop: '5rem',
    padding: '0 1rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #4a5568',
    borderRadius: '9999px',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
  },
  profileName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  profileUsername: {
    color: '#a0aec0',
  },
  joinDate: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    color: '#a0aec0',
  },
  followInfo: {
    display: 'flex',
    marginTop: '1rem',
    gap: '1rem',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #2d3748',
    marginTop: '1rem',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '1rem 0',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  activeTab: {
    borderBottom: '2px solid #4299e1',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  modalContent: {
    backgroundColor: '#2d3748',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '28rem',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'medium',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    color: '#a0aec0',
  },
  input: {
    padding: '0.5rem',
    backgroundColor: '#4a5568',
    border: '1px solid #2d3748',
    borderRadius: '0.25rem',
    color: 'white',
  },
  fileUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    border: '2px dashed #4a5568',
    borderRadius: '0.25rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 'medium',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#4a5568',
    color: 'white',
    border: 'none',
  },
  saveButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
  },
  newPostButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '0.5rem',
  },
  toggleButtonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  toggleButton: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #4a5568',
    backgroundColor: '#2d3748',
    color: 'white',
    cursor: 'pointer',
  },
}

export default function ProfilePage() {
  const { alias } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fotoPerfilUrl: '',
    fotoPortadaUrl: '',
    c_seguidores: '',
    c_seguidos: '',
    descripcion: ''
  })
  const [alignment, setAlignment] = useState('web')
  const [isDivVisible, setIsDivVisible] = useState(false)
  const [isDivVisible2, setIsDivVisible2] = useState(false)
  const [isDivVisible3, setIsDivVisible3] = useState(false)

  useEffect(() => {
    if (alias) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query {
                  buscarPorAlias(alias: "${alias}") {
                    nombre
                    apellido
                    fotoPerfilUrl
                    fotoPortadaUrl
                    alias
                    c_seguidores
                    c_seguidos
                    descripcion
                  }
                }
              `,
            }),
          })

          const result = await response.json()

          if (result.data && result.data.buscarPorAlias) {
            setUserData(result.data.buscarPorAlias)
          } else {
            navigate('/404')
          }
        } catch (error) {
          console.error("Error al conectar con el servidor", error)
          navigate('/404')
        }
      }

      fetchUserData()
    } else {
      console.log("Alias no encontrado en la URL.")
      navigate('/404')
    }
  }, [alias, navigate])

  const handleEditProfile = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    setIsModalOpen(false)
  }

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const renderComponent = () => {
    switch (alignment) {
      case 'web': return <h1>Publicaciones</h1>
      case 'android': return <h1>Multimedia</h1>
      case 'ios': return <h1>Información</h1>
      default: return <h1>Publicaciones</h1>
    }
  }

  const handleImageClick = () => setIsDivVisible(!isDivVisible)
  const handleImageClick2 = () => setIsDivVisible2(!isDivVisible2)
  const handleImageClick3 = () => setIsDivVisible3(!isDivVisible3)

  return (
    <div style={styles.container}>
      <div style={{ flex: 1 }}>
        
        <div style={styles.profileInfo}>
          <img
            src={userData.fotoPortadaUrl || imgFondoDefault}
            alt="Cover"
            style={styles.coverImage}
            onClick={handleImageClick}
          />
          <img
            src={userData.fotoPerfilUrl || imgPerfilDefault}
            alt="Profile"
            style={styles.profileImage}
            onClick={handleImageClick2}
          />
        </div>

        <div style={styles.profileContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            
            <button onClick={() => setIsModalOpen(true)} style={styles.editButton}>
              Edit profile
            </button>
          </div>

          <h2 style={styles.profileName}>{userData.nombre} {userData.apellido}</h2>
          <p style={styles.profileUsername}>@{userData.alias}</p>

          <div style={styles.followInfo}>
          <span><strong>{userData.c_seguidores}</strong>  Seguidores</span>
          <span><strong>{userData.c_seguidos}</strong>  Seguidos</span>
          </div>

         
          

          <p style={{marginTop: '1rem'}}>{userData.descripcion}</p>

          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={styles.toggleButtonGroup}
          >
            <ToggleButton value="web" style={styles.toggleButton}>Publicaciones</ToggleButton>
            <ToggleButton value="android" style={styles.toggleButton}>Multimedia</ToggleButton>
            <ToggleButton value="ios" style={styles.toggleButton}>Información</ToggleButton>
          </ToggleButtonGroup>

          <div style={{marginTop: '1rem'}}>
            {renderComponent()}
          </div>
        </div>
      </div>

      {/* <div style={{width: '300px', marginLeft: '1rem'}}>
        <MenuDerecho />
      </div> */}

      {/* Edit Profile Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={styles.modal}>
          <Dialog.Panel style={styles.modalContent}>
            <Dialog.Title as="h3" style={styles.modalTitle}>
              Edit Profile
            </Dialog.Title>
            <form onSubmit={handleEditProfile} style={styles.form}>
             <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input type="text" id="name" name="name" defaultValue={userData.nombre} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Apellido</label>
                <input type="text" id="name" name="name" defaultValue={userData.apellido} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>Username</label>
                <input type="text" id="username" name="username" defaultValue={userData.alias} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="gender" style={styles.label}>Gender</label>
                <select id="gender" name="gender" style={styles.input}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="birthdate" style={styles.label}>Birth Date</label>
                <input type="date" id="birthdate" name="birthdate" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Profile Picture</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#4a5568', marginRight: '1rem'}}></span>
                  <button type="button" style={{...styles.button, ...styles.cancelButton}}>
                    Change
                  </button>
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Cover Picture</label>
                <div style={styles.fileUpload}>
                  <CameraIcon style={{width: '3rem', height: '3rem', color: '#a0aec0', marginBottom: '0.5rem'}} />
                  <div style={{fontSize: '0.875rem', color: '#a0aec0'}}>
                    <label htmlFor="file-upload" style={{color: '#4299e1', cursor: 'pointer'}}>
                      Upload a file
                    </label>
                    <input id="file-upload" name="file-upload" type="file" style={{display: 'none'}} />
                    <span> or drag and drop</span>
                  </div>
                  <p style={{fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.5rem'}}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{...styles.button, ...styles.cancelButton}}>
                  Cancel
                </button>
                <button type="submit" style={{...styles.button, ...styles.saveButton}}>
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}