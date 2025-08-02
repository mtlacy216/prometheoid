export interface Point {
  x: number;
  y: number;
}

/**
 * Compute an SVG cubic Bezier path connecting two points.
 * Adapted from n8n's editor-ui under the Sustainable Use License.
 */
export function getBezierPath(start: Point, end: Point): string {
  const dx = Math.max(50, Math.abs(end.x - start.x) / 2);
  return `M ${start.x},${start.y} C ${start.x + dx},${start.y} ${end.x - dx},${end.y} ${end.x},${end.y}`;
}
