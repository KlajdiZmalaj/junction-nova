export type IUserType = {
  token: string;
  displayName: string;
};
export type ILoginFormData = {
  username: string;
  password: string;
};
export type IBuildingType = {
  name: string;
  id: string;
};
export type IFloorType = {
  buildingId: string;
  floorNumber: string | number;
  id: string;
};
export type IRoomType = {
  alarm: boolean;
  area: string;
  description: string;
  floorId: string;
  id: string;
  name: string;
  occupied: boolean;
  residentId: string[];
  contractId: string;
  price: string;
};
export type IResidentType = {
  contractId: string;
  id: string;
  name: string;
  roomId: string;
  surname: string;
};
export type IContractType = {
  id: string;
  pdfPath: string;
};
