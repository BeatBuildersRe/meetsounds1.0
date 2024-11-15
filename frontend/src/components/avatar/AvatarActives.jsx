import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import useObtenerUsuarios from "@services/GetUsuarios";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const BadgeAvatars =(props) => {
  const { usuarios, cargando, error } = useObtenerUsuarios();
  if (props.opcion) {
    return (
      <>
        {usuarios?.map((user, index) => (
          <div
            key={index}
            className="usuarios-activos"
            style={{ display: "flex" }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                sx={{ width: "50px", height: "50px" }}
                alt={user.nombre}
                src={
                  user.fotoPerfilUrl
                    ? user.fotoPerfilUrl
                    : "/static/images/avatar/1.jpg"
                }
              />
            </StyledBadge>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {usuarios?.map((user, index) => (
          <div
            key={index}
            className="usuarios-activos"
            style={{ display: "flex" }}
          >
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              alt={user.nombre}
              src={
                user.fotoPerfilUrl
                  ? user.fotoPerfilUrl
                  : "/static/images/avatar/1.jpg"
              }
            />
          </div>
        ))}
      </>
    );
  }
}
export default BadgeAvatars;