const FRAME = 20; // 20ms may be enough for a frame duration

export function nextFrame() {
  return new Promise((resolve) => setTimeout(resolve, FRAME));
}
