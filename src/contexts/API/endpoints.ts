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

export const UPDATE_RESIDENT = (roomId: "", userName: "", userSurname: "") => ({
  url: "room/updateResident",
  method: "POST",
});

export const REMOVE_RESIDENT = (roomId: "", residentId: "") => ({
  url: "room/deleteResident",
  method: "POST",
});
export const ADD_RESIDENT = (roomId: "", residentId: "") => ({
  url: "room/addResident",
  method: "POST",
});
export const UPLOAD_CONTRACT = (roomId: "", base64String: "") => ({
  url: "room/updateRoomContract",
  method: "POST",
});

export const GET_CONTRACT = (contractId: "") => ({
  url: "contract/byId",
  method: "GET",
});

export const REMOVE_CONTRACT = (id: string) => ({
  url: `contract/delete/${id}`,
  method: "POST",
});
