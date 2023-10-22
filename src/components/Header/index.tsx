import Icon from "../Icon";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "primereact/hooks";
import "./style.scss";
import { useRouter } from "next/navigation";
import { useAPIContext } from "@/contexts/API";
import { logo } from "@/images";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { Dialog } from "primereact/dialog";
import { useGlobalContext } from "@/contexts/Global";

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const { allResidentsModal, setAllResidentsModal, residents, getResidents } = useGlobalContext();
  useEffect(() => {
    getResidents();
  }, []);
  return (
    <div
      ref={headerRef}
      className="header w-full h-[70px] items-center flex justify-between bg-white text-black"
    >
      <div>
        <Icon
          onClick={() => {
            setAllResidentsModal(true);
          }}
          icon="user"
          size={20}
          className="ml-5"
        />
      </div>
      <div className="text-body-m p-3 flex items-center logo">
        <Image className="cursor-pointer" onClick={() => router.push("/")} src={logo} alt="" />
      </div>
      <div className="flex items-center">
        <div className="dropDownWrapper">
          <ClientButtonRender headerRef={headerRef} />
        </div>
      </div>
      <Dialog
        dismissableMask={true}
        style={{ width: "80vw" }}
        maximizable
        header={`All Residents`}
        visible={allResidentsModal}
        onHide={() => {
          setAllResidentsModal(false);
        }}
      >
        {residents.map((item) => {
          return (
            <div className="residentsWrapper" key={item.id}>
              <span>
                Name : {item.name} {item.surname}
              </span>
              <span>Phone : {item.telephone}</span>
              <span>Note : {item.note}</span>
            </div>
          );
        })}
      </Dialog>
    </div>
  );
};

//we render this component in client becouse it takes information from client localstorage
const ClientButtonRender = dynamic(
  () =>
    Promise.resolve(({ headerRef }: any) => {
      const [active, setActive] = useState(false);

      const { user } = useAPIContext();
      const router = useRouter();

      useClickOutside(headerRef, () => {
        setActive(false);
      });
      return (
        <>
          {" "}
          {user?.displayName ? (
            <Button
              onClick={() => setActive(!active)}
              className="bg-primary-900 text-white text-body-s rounded-none border-0"
            >
              <Icon size={16} className="mr-3" icon="user" /> {user.displayName}
              <Icon className="ml-3" size={10} icon="triangle-down" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-primary-900 text-white text-body-s rounded-none border-0"
            >
              Login
            </Button>
          )}
          {active && <DropDownMenu />}
        </>
      );
    }),
  { ssr: false }
);

const DropDownMenu = () => {
  const { logout } = useAPIContext();

  return (
    <ul className="shadowed bg-neutral-700 text-white absolute right-0 top-full w-full flex-col flex items-center justify-center z-10">
      {/* <li className="text-body-s">Impostazioni account</li> */}
      <li className="text-body-s" onClick={logout}>
        Logout
      </li>
    </ul>
  );
};

export default Header;
