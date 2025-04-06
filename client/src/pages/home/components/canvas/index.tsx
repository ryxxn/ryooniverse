import { useEffect, useRef } from "react";
import { CANVAS_CONSTANT } from "./canvas.constants";
import { setupInput, loadCharacterImage, loadMap, startGameLoop } from "./canvas.utils";

export default function CanvasStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const cleanup = setupInput();

    Promise.all([loadCharacterImage(), loadMap()]).then(() => {
      startGameLoop(ctx);
    });

    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_CONSTANT.MAP_WIDTH}
      height={CANVAS_CONSTANT.MAP_HEIGHT}
    />);
}
