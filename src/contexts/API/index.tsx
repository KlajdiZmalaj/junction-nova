"use client";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as endpoints from "./endpoints";
import { getFromStorage, setInStorage } from "@/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const APIContext = createContext<APIContextType>({
  fetch: () => {},
  user: null,
  login: () => {},
  logout: () => {},
});

const APIProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState(getFromStorage("user") || {});

  useEffect(() => {
    //when user changes save to localStorage
    setInStorage("user", user);
    setInStorage("token", user.token);
  }, [user]);

  const login = async (data: any) => {
    console.log("login called", data);

    fetch("LOGIN", { ...data }).then((data) => {
      setUser({
        ...data,
      });

      router.push("/");
    });
  };

  const logout = async () => {
    //call logut and remove from storage
    fetch("LOGOUT", {}).then((data) => {
      setInStorage("user", {});
      setUser({});
    });
  };

  const fetch = async (REQUEST_PATH: string, extraParams: any) => {
    //@ts-ignore
    const options = endpoints[REQUEST_PATH]?.(extraParams.subpath) as endpoints.EndpointReturn;
    //subpath is added to fetch url after endpoint api/example/subath then is deleted from payload params
    delete extraParams?.subpath;

    if (options) {
      try {
        let token = getFromStorage("token");
        console.log("fetch token", token);

        const response = await handler(
          { ...options, ...(extraParams ? { data: extraParams } : {}) },
          token
        );
        // console.log("LOG ~ FETCH RESPONSE", REQUEST_PATH, " ", response);
        return response.data;
      } catch (err: any) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error("Error : ", err);
        toast.error(`${err?.response?.data?.message || err?.message}`, {
          position: "top-left",
          theme: "dark",
          toastId: err.config.url,
        });
        const { status, data } = err.response || {};

        if (!status) {
          throw `[${options.method} ${options.url}] ${err}`;
        }

        throw `[${options.method} ${options.url}] Error ${status}: ${data?.title}`;
      }
    } else {
      console.log("REQUEST_PATH doesnt exist in endpoints");
    }
  };
  return (
    <APIContext.Provider
      value={{
        fetch,
        user,
        login,
        logout,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export { APIContext, endpoints };
export const useAPIContext = () => useContext(APIContext);
export default APIProvider;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handler = (options: any, token: string) => {
  return axios.request({
    ...options,
    url: `${API_URL}${options.url}`,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    [options.method.match(/POST|PATCH/g) ? "data" : "params"]: options.data,
    paramsSerializer: { indexes: null },
  });
};

//types
type APIContextType = {
  fetch: (REQUEST_PATH: string, extraParams?: any) => Promise<void> | any;
  user: any;
  login: Promise<void> | any;
  logout: Promise<void> | any;
};
