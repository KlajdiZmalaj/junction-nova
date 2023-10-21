import { useCallback, useState } from "react";

const DEFAULT_ZOOM = 1;
//when increment or decrement
const CHANGE_BY = 0.3;

export default () => {
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);

  const resetZoom = useCallback(() => setZoomLevel(DEFAULT_ZOOM), []);
  const incrementZoom = useCallback(() => setZoomLevel(zoomLevel + CHANGE_BY), [zoomLevel]);
  const decrementZoom = useCallback(() => setZoomLevel(zoomLevel - CHANGE_BY), [zoomLevel]);

  return {
    resetZoom,
    zoomLevel,
    incrementZoom,
    decrementZoom,
  };
};
