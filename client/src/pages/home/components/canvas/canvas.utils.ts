import { useCanvasStore } from "./canvas.store";

export function startGameLoop(ctx: CanvasRenderingContext2D) {
  function loop() {
    updateMyPlayer(getKeys());
    draw(ctx);
    requestAnimationFrame(loop);
  }
  loop();
}

// render
let characterImage: HTMLImageElement;

export function loadCharacterImage(): Promise<void> {
  return new Promise((resolve) => {
    characterImage = new Image();
    characterImage.src = "/assets/characters/character1.png";
    characterImage.onload = () => resolve();
  });
}

export function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawMap(ctx);

  const { myCharacter } = useCanvasStore.getState();
  ctx.drawImage(characterImage, myCharacter.x, myCharacter.y, 100, 100);

  drawOthers(ctx);
}

// player
export function updateMyPlayer(keys: Set<string>) {
  const { myCharacter, setMyPosition } = useCanvasStore.getState();
  let { x, y } = myCharacter;
  const speed = 2;
  const canvasWidth = 1200;
  const canvasHeight = 800;
  const charSize = 100;

  if (keys.has("ArrowUp")) y = Math.max(0, y - speed);
  if (keys.has("ArrowDown")) y = Math.min(canvasHeight - charSize, y + speed);
  if (keys.has("ArrowLeft")) x = Math.max(0, x - speed);
  if (keys.has("ArrowRight")) x = Math.min(canvasWidth - charSize, x + speed);

  setMyPosition(x, y);
}

// others
export function drawOthers(ctx: CanvasRenderingContext2D) {
  const others = useCanvasStore.getState().otherCharacters;
  others.forEach((char) => {
    const img = new Image();
    img.src = `/assets/characters/${char.characterId}.png`;
    ctx.drawImage(img, char.x, char.y, 100, 100);
  });
}

// map
let mapImage: HTMLImageElement;

export function loadMap(): Promise<void> {
  return new Promise((resolve) => {
    mapImage = new Image();
    mapImage.src = "/assets/home-bg.png";
    mapImage.onload = () => resolve();
  });
}

export function drawMap(ctx: CanvasRenderingContext2D) {
  const pattern = ctx.createPattern(mapImage, "repeat");
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

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}

export function getKeys(): Set<string> {
  return keys;
}
