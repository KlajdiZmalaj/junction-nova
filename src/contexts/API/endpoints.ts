export const LOGIN = () => ({
  url: "auth/authenticate",
  method: "POST",
});

export const LOGOUT = () => ({
  url: "auth/logout",
  method: "POST",
});

//GETs
export const GET_BUILDINGS = () => ({
  url: "building/getAll",
  method: "GET",
});

export const GET_FLOORS = (buildingId = "") => ({
  url: "floor/forBuilding",
  method: "GET",
});

export const GET_ROOMS = (floorId = "") => ({
  url: "room/perFloor",
  method: "GET",
});

export const GET_RESIDENTS = () => ({
  url: "resident/getAll",
  method: "GET",
});
