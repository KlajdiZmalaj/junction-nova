import Header from "@/components/Header";
import { floor } from "@/images";
import Image from "next/image";
import "./style.scss";
import { Dialog } from "primereact/dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/contexts/Global";
import { API_URL, useAPIContext } from "@/contexts/API";
import { InputText } from "primereact/inputtext";
import Icon from "@/components/Icon";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import Button from "@/components/Button";
import { AutoComplete } from "primereact/autocomplete";
import { IContractType, IResidentType } from "@/types";
import { toast } from "react-toastify";

const RenderRoom = ({ id, setDialog }: any) => {
  const { fetch } = useAPIContext();
  const { rooms } = useGlobalContext();

  //renders room on 2d plan
  const roomObj = rooms[id - 1];

  return (
    <div
      onClick={() => {
        setDialog({ visible: true, roomNr: id });
        fetch("GET_ROOM_DETAILS", {});
      }}
      className={`room room${id} ${roomObj?.occupied ? "redRoom" : "greenRoom"}`}
    >
      Room {id}
    </div>
  );
};
export default () => {
  const autoCmplRef = useRef<any>({});
  const { fetch } = useAPIContext();
  const { floors, getBuildingFloors, getResidents, residents, getRooms, rooms } =
    useGlobalContext();

  const { floorId, buildingId } = useParams();
  const [dialogData, setDialog] = useState<any>({
    visible: false,
  });

  const [selectedResidents, setSelectedResidents] = useState<IResidentType[]>([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [contractInfos, setContractInfos] = useState<IContractType | null>(null);

  const currentRoomOnModal = rooms[dialogData?.roomNr - 1];

  useEffect(() => {
    if (currentRoomOnModal?.alarm) {
      toast.warning(`Sensor triggered, Alarm on room ${currentRoomOnModal?.floorId}`);
    }
  }, [currentRoomOnModal?.alarm]);

  useEffect(() => {
    //reset contract while switching roomss
    if (currentRoomOnModal?.id) {
      setContractInfos(null);
    }
  }, [currentRoomOnModal?.id]);

  useEffect(() => {
    getBuildingFloors(buildingId);
    getResidents();
  }, [buildingId]);

  useEffect(() => {
    getRooms(floorId);
    let vali: number;
    if (floorId) {
      //we get Residents and rooms each 2 seconds for real time updates
      vali = window.setInterval(() => {
        getRooms(floorId);
      }, 2000);
    }
    return () => {
      clearInterval(vali);
    };
  }, [floorId]);

  useEffect(() => {
    if (currentRoomOnModal?.residentId) {
      const mapedResidents: any =
        (currentRoomOnModal?.residentId || []).map((rId) => residents.find((r) => r.id == rId)) ||
        [];
      setSelectedResidents(mapedResidents);
    }
  }, [currentRoomOnModal?.residentId, residents]);

  useEffect(() => {
    //get contract details if we have id on room
    if (currentRoomOnModal?.contractId) {
      fetch("GET_CONTRACT", { contractId: currentRoomOnModal.contractId }).then(
        (data: IContractType) => {
          setContractInfos(data);
        }
      );
    }
  }, [currentRoomOnModal?.contractId]);

  const selectedFloor = useMemo(() => floors.find((f: any) => f.id == floorId), [floors, floorId]);

  const customBase64Uploader = async (e: any) => {
    // convert file to base64 encoded
    const file = e.files[0];

    var fileToLoad = file;
    var fileReader = new FileReader();
    var base64File;
    // Reading file content when it's loaded
    fileReader.onload = function (event: any) {
      base64File = event.target.result;
      // base64File console
      console.log(base64File);
      setDialog({
        ...dialogData,
        base64String: base64File,
      });
    };

    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  };
  const handleSubmit = () => {
    const base64String = dialogData?.base64String?.split?.(",")?.[1];
    if (base64String && dialogData.dates?.[0]) {
      fetch("UPLOAD_CONTRACT", {
        base64String,
        roomId: currentRoomOnModal.id,
        start: dialogData.dates?.[0],
        end: dialogData.dates?.[1],
        type: "pdf",
      }).then(() => {
        toast.success("Done!");
      });
    } else {
      toast.info("PDF and Date are required!");
    }
  };

  const search = (event: any) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredResidents: any;

      if (!event.query.trim().length) {
        _filteredResidents = [...residents];
      } else {
        _filteredResidents = residents.filter((r) => {
          return `${r.name} ${r.surname}`.toLowerCase().includes(
            // ""
            event.query.toLowerCase()
          );
        });
      }

      setFilteredResidents(_filteredResidents);
    }, 250);
  };
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
              return <RenderRoom setDialog={setDialog} key={index} id={index + 1} />;
            })}
        </div>
        <Dialog
          dismissableMask={true}
          style={{ width: "80vw" }}
          maximizable
          header={`Room ${dialogData.roomNr} Details | ${currentRoomOnModal?.name}`}
          visible={dialogData.visible}
          onHide={() => {
            setDialog({ visible: false });
          }}
        >
          <div className="roomDetails">
            <div className="roomWrapper">
              <div
                style={{
                  backgroundColor: currentRoomOnModal?.occupied ? `#da0c0c` : `#18c218`,
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
                <InputText disabled value={`Price: ${currentRoomOnModal?.price}$ `} />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Icon icon="circle-info" />
                </span>
                <InputText disabled value={`Total area : ${currentRoomOnModal?.area}㎡ `} />
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

              <AutoComplete
                ref={autoCmplRef}
                field="name"
                multiple
                value={selectedResidents}
                suggestions={filteredResidents}
                completeMethod={search}
                selectedItemTemplate={(e) => `${e.name} ${e.surname}`}
                onKeyUp={(e: any) => {
                  const valString = e.target?.value || "";
                  if (e.key === "Enter") {
                    fetch("UPDATE_RESIDENT", {
                      roomId: currentRoomOnModal.id,
                      name: valString.split(" ")[0] || "",
                      surname: valString.split(" ")[1] || "",
                    }).then(() => {
                      getResidents();
                      getRooms(floorId);
                      autoCmplRef.current.getInput().value = "";
                    });
                  }
                  // console.log("autoCmplRef");
                }}
                onUnselect={({ value }) => {
                  const { id } = value;
                  fetch("REMOVE_RESIDENT", {
                    residentId: id,
                    roomId: currentRoomOnModal.id,
                  }).then(() => {
                    getResidents();
                    getRooms(floorId);
                  });
                }}
                onSelect={({ value }) => {
                  const { id } = value;
                  fetch("ADD_RESIDENT", {
                    residentId: id,
                    roomId: currentRoomOnModal.id,
                  }).then(() => {
                    getResidents();
                    getRooms(floorId);
                  });
                }}
                onChange={(e) => {
                  const lastItem = e.value[e.value.length - 1];
                  console.log("on change", e.value, selectedResidents, lastItem);
                }}
                placeholder="Select residents for this room"
              />

              {contractInfos?.pdfPath ? (
                <div>
                  <a
                    href={`${API_URL}contract/downloadFile?pdfPath=${contractInfos?.pdfPath}`}
                    className="p-button downloadContract"
                    download
                    target="_blank"
                  >
                    Download Contract
                  </a>
                  <Button
                    onClick={() => {
                      fetch("REMOVE_CONTRACT", {
                        subpath: contractInfos.id,
                      }).then(() => setContractInfos(null));
                    }}
                    className="!ml-2 !bg-error-300"
                  >
                    Remove contract
                  </Button>
                </div>
              ) : (
                <div className="contractWrapper">
                  <FileUpload
                    onSelect={customBase64Uploader}
                    accept="*"
                    maxFileSize={8000000}
                    mode="advanced"
                    emptyTemplate={
                      <p className="m-0">Upload / Drag and drop contracts here to upload.</p>
                    }
                  />
                  <Calendar
                    value={dialogData?.dates}
                    onChange={(e: any) => {
                      setDialog({
                        ...dialogData,
                        dates: e.value,
                      });
                    }}
                    selectionMode="range"
                    readOnlyInput
                    placeholder="Contract date : From - To"
                  />
                  <Button onClick={handleSubmit} className="!mt-7 !ml-autp">
                    Submit
                  </Button>
                </div>
              )}
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
