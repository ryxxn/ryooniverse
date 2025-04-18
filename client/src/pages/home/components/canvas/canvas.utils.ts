import { useCanvasStore } from './canvas.store';
import { CANVAS_CONSTANT } from './canvas.constants';
import { socket } from '../../../../shared/utils';
import { throttle } from '../../../../shared/utils/throttle';

const throttledEmitMove = throttle(
  (user: { id: string; x: number; y: number; character: string }) => {
    const { x, y, ...rest } = user;
    const position = { x, y };
    socket.emit('move', { position, ...rest });
  },
  50
);

let isLoopRunning = false;

export function startGameLoop(ctx: CanvasRenderingContext2D) {
  if (isLoopRunning) return; // 이미 루프 돌고 있으면 중복 방지
  isLoopRunning = true;

  function loop() {
    updateMyPlayer(getKeys());
    draw(ctx);
    requestAnimationFrame(loop);
  }

  loop();
}

// render
let characterImage: HTMLImageElement;

export function loadCharacterImage(character: string): Promise<void> {
  return new Promise((resolve) => {
    characterImage = new Image();
    characterImage.src = CANVAS_CONSTANT.CHARACTER_IMAGE(character);
    characterImage.onload = () => resolve();
  });
}

export function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawMap(ctx);

  const { myCharacter } = useCanvasStore.getState();
  ctx.drawImage(
    characterImage,
    myCharacter.x,
    myCharacter.y,
    CANVAS_CONSTANT.CHARACTER_SIZE,
    CANVAS_CONSTANT.CHARACTER_SIZE
  );

  drawOthers(ctx);
}

// player
export function updateMyPlayer(keys: Set<string>) {
  const { myCharacter, setMyPosition } = useCanvasStore.getState();
  let { x, y } = myCharacter;
  const speed = CANVAS_CONSTANT.SPEED;
  const canvasWidth = CANVAS_CONSTANT.MAP_WIDTH;
  const canvasHeight = CANVAS_CONSTANT.MAP_HEIGHT;
  const charSize = CANVAS_CONSTANT.CHARACTER_SIZE;

  if (keys.has('ArrowUp')) y = Math.max(0, y - speed);
  if (keys.has('ArrowDown')) y = Math.min(canvasHeight - charSize, y + speed);
  if (keys.has('ArrowLeft')) x = Math.max(0, x - speed);
  if (keys.has('ArrowRight')) x = Math.min(canvasWidth - charSize, x + speed);

  if (x !== myCharacter.x || y !== myCharacter.y) {
    setMyPosition(x, y);
    throttledEmitMove(myCharacter);
  }
}

// others
export function drawOthers(ctx: CanvasRenderingContext2D) {
  const others = useCanvasStore.getState().otherCharacters;
  others.forEach((char) => {
    const img = new Image();
    img.src = CANVAS_CONSTANT.CHARACTER_IMAGE(char.character);
    ctx.drawImage(
      img,
      char.x,
      char.y,
      CANVAS_CONSTANT.CHARACTER_SIZE,
      CANVAS_CONSTANT.CHARACTER_SIZE
    );
  });
}

// map
let mapImage: HTMLImageElement;

export function loadMap(): Promise<void> {
  return new Promise((resolve) => {
    mapImage = new Image();
    mapImage.src = CANVAS_CONSTANT.BACKGROUND_IMAGE;
    mapImage.onload = () => resolve();
  });
}

export function drawMap(ctx: CanvasRenderingContext2D) {
  const pattern = ctx.createPattern(mapImage, 'repeat');
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(mapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}

// input
const keys = new Set<string>();

export function setupInput() {
  const onKeyDown = (e: KeyboardEvent) => keys.add(e.key);
  const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  };
}

export function getKeys(): Set<string> {
  return keys;
}

export function stopGameLoop() {
  isLoopRunning = false;
}
