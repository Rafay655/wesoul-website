/** The second animation frame runs after the browser can paint the first. */
export function afterPaint(
  requestFrame: (callback: FrameRequestCallback) => number,
  cancelFrame: (handle: number) => void,
  navigate: () => void,
): () => void {
  let cancelled = false;
  let handle = requestFrame(() => {
    if (cancelled) return;
    handle = requestFrame(() => {
      if (!cancelled) navigate();
    });
  });
  return () => {
    cancelled = true;
    cancelFrame(handle);
  };
}
