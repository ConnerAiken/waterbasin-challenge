export type Altitudes = number[][];
export type Point = [number, number];
export type Basin = { 
    basin: Point;
    points: Point[]; 
}
export type BasinDiff = { 
    point: false |Point;
    diff: number; 
}