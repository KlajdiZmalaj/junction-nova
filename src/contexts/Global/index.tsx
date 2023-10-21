"use client";
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useAPIContext } from "../API";
import { IBuildingType, IFloorType, IResidentType, IRoomType } from "@/types";

const GlobalContext = createContext<IGlobalContext>({
  buildings: [],
  floors: [],
  setBuildings: () => {},
  getBuildingFloors: () => {},
  rooms: [],
  getRooms: () => {},
  residents: [],
  getResidents: () => {},
});

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const { fetch } = useAPIContext();
  const [buildings, setBuildings] = useState<IBuildingType[]>([]);
  const [floors, setFloors] = useState<IFloorType[]>([]);
  const [rooms, setRooms] = useState<IRoomType[]>([]);
  const [residents, setResidents] = useState<IResidentType[]>([]);

  useEffect(() => {
    fetch("GET_BUILDINGS", {}).then((data: any) => {
      setBuildings(data);
    });
  }, []);

  const getBuildingFloors = (buildingId: string) => {
    fetch("GET_FLOORS", { buildingId }).then((data: any) => {
      setFloors(data);
    });
  };
  const getResidents = () => {
    fetch("GET_RESIDENTS", {}).then((data: any) => {
      setResidents(data);
    });
  };
  const getRooms = (floorId: string) => {
    fetch("GET_ROOMS", { floorId }).then((data: any) => {
      setRooms(data);
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        buildings,
        setBuildings,
        getBuildingFloors,
        floors,
        getResidents,
        residents,
        rooms,
        getRooms,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
interface IGlobalContext {
  buildings: IBuildingType[];
  setBuildings: Dispatch<SetStateAction<any>>;
  getBuildingFloors: (id: string) => void;
  floors: IFloorType[];
  getRooms: (id: string) => void;
  rooms: IRoomType[];
  getResidents: () => void;
  residents: IResidentType[];
}
export default GlobalProvider;
export const useGlobalContext = () => useContext(GlobalContext);
