import { useEffect, useRef } from "react";
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

  return <canvas ref={canvasRef} width={1200} height={800} />;
}
