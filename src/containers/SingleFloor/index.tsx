import Header from "@/components/Header";
import { floor } from "@/images";
import Image from "next/image";
import "./style.scss";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/contexts/Global";
import { useAPIContext } from "@/contexts/API";
import { InputText } from "primereact/inputtext";
import Icon from "@/components/Icon";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";

export default () => {
  const { floors, getBuildingFloors, getResidents, residents, getRooms, rooms } =
    useGlobalContext();
  const { fetch } = useAPIContext();
  const [selectedResidents, setSelectedResidents] = useState(null);

  const { floorId, buildingId } = useParams();
  const [dialogData, setDialog] = useState<any>({
    visible: false,
  });

  useEffect(() => {
    getBuildingFloors(buildingId);
    getResidents();
  }, [buildingId]);

  useEffect(() => {
    if (floorId) getRooms(floorId);
  }, [floorId]);

  const RenderRoom = ({ id }: any) => {
    //renders room on 2d plan
    return (
      <div
        onClick={() => {
          setDialog({ visible: true, roomNr: id });
          fetch("GET_ROOM_DETAILS", {});
        }}
        className={`room room${id}`}
      >
        Room {id}
      </div>
    );
  };
  const selectedFloor = useMemo(() => floors.find((f: any) => f.id == floorId), [floors, floorId]);

  console.log("residents", residents);
  console.log("selectedResidents", selectedResidents);
  console.log("rooms", rooms);

  const currentRoomOnModal = rooms[dialogData?.roomNr - 1];
  console.log("currentRoomOnModal", currentRoomOnModal);

  return (
    <div className="home">
      <Header />
      <div className="floor">
        <div className="text-heading-l">Floor nr.{selectedFloor?.floorNumber}</div>
        <p className="text-body-m">Select one room to check more details</p>
        <div className="floorWrapper">
          <Image src={floor} alt="" />

          {Array(8)
            .fill("")
            .map((_, index) => {
              return <RenderRoom key={index} id={index + 1} />;
            })}
        </div>
        <Dialog
          dismissableMask={true}
          style={{ width: "80vw" }}
          maximizable
          header={`Room ${dialogData.roomNr} Details`}
          visible={dialogData.visible}
          onHide={() => {
            setDialog({ visible: false });
          }}
        >
          <div className="roomDetails">
            <div className="roomWrapper">
              <div
                style={{
                  backgroundColor: currentRoomOnModal?.occupied ? `#c21818` : `#18c218`,
                }}
                className={`room${dialogData.roomNr}`}
              ></div>
              <Legend />
            </div>
            <div className="roomForm">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Icon icon="circle-info" />
                </span>
                <InputText disabled value="Total area : 35㎡ " />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Icon icon="circle-info" />
                </span>
                <InputTextarea
                  autoResize
                  value={currentRoomOnModal?.description}
                  rows={5}
                  cols={30}
                  disabled
                />
              </div>

              <MultiSelect
                value={selectedResidents}
                onChange={(e) => setSelectedResidents(e.value)}
                options={residents}
                optionLabel="name"
                placeholder="Select Residents"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
              />
              <FileUpload
                name="contract"
                url={"/api/upload"}
                multiple
                accept="image/*"
                maxFileSize={5000000}
                emptyTemplate={
                  <p className="m-0">Upload / Drag and drop contracts here to upload.</p>
                }
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
const Legend = () => {
  return (
    <div className="legend">
      <span>
        <div
          style={{
            backgroundColor: `#18c218`,
          }}
        ></div>
        = Available
      </span>
      <span>
        <div
          style={{
            backgroundColor: `#c21818`,
          }}
        ></div>
        = Occupied
      </span>
    </div>
  );
};
