import { useEffect, useRef } from 'react';
import { CANVAS_CONSTANT } from './canvas.constants';
import {
  setupInput,
  loadCharacterImage,
  loadMap,
  startGameLoop,
} from './canvas.utils';
import { useEnterUser } from '../../../../shared/apis/users/enter';
import { useCanvasStore } from './canvas.store';

export default function CanvasStage() {
  const { data } = useEnterUser({ enabled: false });
  const { x, y } = useCanvasStore((state) => state.myCharacter);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const cleanup = setupInput();

    Promise.all([loadCharacterImage(data?.character ?? '1'), loadMap()]).then(
      () => {
        startGameLoop(ctx);
      }
    );

    return cleanup;
  }, [data]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_CONSTANT.MAP_WIDTH}
        height={CANVAS_CONSTANT.MAP_HEIGHT}
      />
      <div
        className="absolute text-white text-sm font-bold"
        style={{
          top: y + 100,
          left: x + 50,
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      >
        <div className="bg-black bg-opacity-60 px-2 py-1 rounded-lg">
          {data?.username}
        </div>
      </div>
    </div>
  );
}
