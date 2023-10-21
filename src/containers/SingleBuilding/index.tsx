import Header from "@/components/Header";
import { base, kat1, kat2, kat3, kat4, kat5, kat6, kat7, kat8, kat9 } from "@/images";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import "./style.scss";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/Global";
export default () => {
  const { id } = useParams();
  const router = useRouter();
  const [floor, setFloor] = useState(0);
  const { buildings, floors, getBuildingFloors } = useGlobalContext();
  const buildingSelected = buildings.find((b: any) => b.id == id);

  useEffect(() => {
    if (buildingSelected?.id) getBuildingFloors(buildingSelected.id);
  }, [buildingSelected?.id]);

  const handleFloorClick = useCallback(
    (floorNumber: number) => {
      const floorId = floors.find((f: any) => f.floorNumber == floorNumber)?.id;
      router.push(`/singleFloor/${buildingSelected?.id}/${floorId}`);
    },
    [floors, buildingSelected?.id]
  );

  return (
    <div className="home">
      <Header />
      <div className="singleBuilding flex fle flex-col ">
        <div className="buildingInfo w-1/2 ">
          <div className="text-heading-l">Building {buildingSelected?.name}</div>
          <p className="text-body-m mt-4">Select a floor on the building to preview rooms</p>
        </div>
        <div className="singleBuildingImgWrapper " onMouseLeave={() => setFloor(0)}>
          <Image
            onClick={() => handleFloorClick(9)}
            src={kat9}
            alt=""
            onMouseEnter={() => setFloor(9)}
          />
          <Image
            onClick={() => handleFloorClick(8)}
            src={kat8}
            alt=""
            onMouseEnter={() => setFloor(8)}
          />
          <Image
            onClick={() => handleFloorClick(7)}
            src={kat7}
            alt=""
            onMouseEnter={() => setFloor(7)}
          />
          <Image
            onClick={() => handleFloorClick(6)}
            src={kat6}
            alt=""
            onMouseEnter={() => setFloor(6)}
          />
          <Image
            onClick={() => handleFloorClick(5)}
            src={kat5}
            alt=""
            onMouseEnter={() => setFloor(5)}
          />
          <Image
            onClick={() => handleFloorClick(4)}
            src={kat4}
            alt=""
            onMouseEnter={() => setFloor(4)}
          />
          <Image
            onClick={() => handleFloorClick(3)}
            src={kat3}
            alt=""
            onMouseEnter={() => setFloor(3)}
          />
          <Image
            onClick={() => handleFloorClick(2)}
            src={kat2}
            alt=""
            onMouseEnter={() => setFloor(2)}
          />
          <Image
            onClick={() => handleFloorClick(1)}
            src={kat1}
            alt=""
            onMouseEnter={() => setFloor(1)}
          />
          <Image onClick={() => handleFloorClick(5)} src={base} alt="" />
          {floor ? <div className="floorNumber">{floor}</div> : null}
        </div>
      </div>
    </div>
  );
};
