export const getFromStorage = (key: string) => {
  let item;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    try {
      item = JSON.parse(localStorage.getItem(key) || "null");
    } catch (err) {
      console.log("storage err", err);
    }
  }
  return item;
};
export const setInStorage = async (key: string, data: any) => {
  let item;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    item = await localStorage.setItem(key, JSON.stringify(data));
  }
  return item;
};

export const clamp = (num: number, min: number, max: number) =>
  num > max ? max : num < min ? min : num;

export function debounce(func: any, delay: number) {
  let timeoutId: any;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
}
export const areEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function formatTimestamp(timestamp: number | null): string | 0 {
  if (!timestamp) {
    return 0;
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
