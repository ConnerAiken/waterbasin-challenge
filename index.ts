/*
 II - Watershed
 Given a matrix that represents altitudes for a geographic region, determine the watersheds and it's basins for that region.

 Basin: a given point that water will flow to, but no further.
 Watershed: area of land with a common basin.
*/

import { Altitudes, Point, BasinDiff, Basin } from "./types";


const input: Altitudes = [
	[3,5,4],
  [2,1,9],
  [6,8,8],
  [6,6,6],
];

/**
 * Gets all the surrounding points of a given point and filters out any out of bounds points
 * @param alitudes {Altitudes}
 * @param point {Point}
 * @returns {Point[]}
 */
const getSurroundingPoints = (alitudes: Altitudes, point: Point) => { 
  const surroundingPoints: Point[] = [];
  const [x, y] = point; 

  // Top left
  if (alitudes[x - 1]?.[y - 1]) {
    surroundingPoints.push([x - 1, y - 1]);
  }

  // Direct top
  if(alitudes[x - 1]?.[y]) {
    surroundingPoints.push([x - 1, y]);
  }

  // Top right
  if (alitudes[x - 1]?.[y + 1]) {
    surroundingPoints.push([x - 1, y + 1]);
  }

  // Direct Right
  if(alitudes[x][y + 1]) {
    surroundingPoints.push([x, y + 1]);
  }

  // Bottom right
  if (alitudes[x + 1]?.[y + 1]) {
    surroundingPoints.push([x + 1, y + 1]);
  }

  // Direct Bottom
  if(alitudes[x + 1]?.[y]) {
    surroundingPoints.push([x + 1, y]);
  }
 
  // Bottom left
  if (alitudes[x + 1]?.[y - 1]) {
    surroundingPoints.push([x + 1, y - 1]);
  } 

  // Direct left
  if(alitudes[x][y - 1]) {
    surroundingPoints.push([x, y - 1]);
  } 

  // Filter negatives
  return surroundingPoints.filter((point) => {
    return point[0] >= 0 && point[1] >= 0;
  });
}
 
/**
 * Finds the final basin point given a waterflow
 * @param alitudes {Altitudes}
 * @param point {Point}
 * @param previousPoints {Point[]} 
 * @returns {Basin}
 */
const findBasanGivenPoint = (alitudes: Altitudes, point: Point, previousPoints: Point[]): Basin | void => { 
  		 let lowestPoint: BasinDiff = {point, diff: 0};
       const surroundingPoints = getSurroundingPoints(alitudes, point);

       surroundingPoints.forEach((nestedPoint: Point) => { 
        const currentPointValue = alitudes[point[0]][point[1]];
        const nestedPointValue = alitudes[nestedPoint[0]][nestedPoint[1]]; 

  
         if(nestedPointValue < currentPointValue) { 
           if(lowestPoint.diff <= (currentPointValue - nestedPointValue)) { 
             lowestPoint.point = [nestedPoint[0], nestedPoint[1]];
             lowestPoint.diff = currentPointValue - nestedPointValue;
           } 
         }  
       });  
 
  	   if(lowestPoint.point && lowestPoint.diff > 0) { 
         	return findBasanGivenPoint(alitudes, lowestPoint.point, [...previousPoints, lowestPoint.point]);
       }else if(lowestPoint.point && lowestPoint.diff === 0) {   
         return { 
           basin: lowestPoint.point,
           points: previousPoints
         };
       } else {
          return;
       }
}

const run = (alitudes: Altitudes) => {  
  const waterFlows: Basin[] = [];
  let nestedArr;

  console.log('Running...');
  console.log('-------------------');
  console.log('Topograph-ish Matrix');
  console.log('-------------------');
  alitudes.forEach((nestedArr, i) => {
    console.log(nestedArr);
  }); 
  console.log('-------------------');

  // looping each array
  for(let i = 0; i < input.length; i++) {
    nestedArr = input[i];
    
    for(let x = 0; x < nestedArr.length; x++) {  
      const waterFlow = findBasanGivenPoint(input, [i, x], [[i, x]]);

      if(waterFlow) {
         waterFlows.push(waterFlow);  
      }
    } 
  }
 
  console.log('Water Flows');
  console.log('-------------------');
  console.log(waterFlows.map((watershed: Basin) => {
    return {
      basinCoords: watershed.basin,
      originCoords: watershed.points[0],
      waterflowCoords: watershed.points.map((point: Point) => { return `(${point[0]},${point[1]})`; }),
    } 
}));
  console.log('-------------------');

  
 
  // Figure out unique basins and points involved in waterflow
  const basins = waterFlows.reduce((accumulator: Basin[], currentValue) => {
    // Check if the basin is already in the accumulator
    const isCaptured = accumulator.filter((watershed: Basin) => {
      return watershed.basin[0] === currentValue.basin[0] && watershed.basin[1] === currentValue.basin[1];
    });
    
    if(isCaptured.length) {
      // Combine the points
      const previousEntryIdx = accumulator.findIndex((watershed: Basin) => {
        return watershed.basin[0] === currentValue.basin[0] && watershed.basin[1] === currentValue.basin[1];
      });

      accumulator[previousEntryIdx].points = [...accumulator[previousEntryIdx].points, ...currentValue.points]; 
      accumulator[previousEntryIdx].points = [...new Set(accumulator[previousEntryIdx].points)]; 
    } else {
      // Push onto accumulator
      accumulator.push(currentValue);
    } 

    return accumulator;
  }, []); 
 
  console.log('Basins');
  console.log('-------------------');
  console.log(basins.map((watershed: Basin) => {
    return {
      basinCoords: watershed.basin,
      points: watershed.points.map((point: Point) => { return `(${point[0]},${point[1]})`; }),
    } 
  }));
};


run(input);
 
 