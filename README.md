
# Coding Challenge 
Given a matrix that represents altitudes for a geographic region, determine the watersheds and it's basins for that region. Water must take the 
most direct path to the basin.

Basin: a given point that water will flow to, but no further.
Watershed: area of land with a common basin.

## Output
```
-------------------
Topograph-ish Matrix
-------------------
[ 3, 5, 4 ]
[ 2, 1, 9 ]
[ 6, 8, 8 ]
[ 6, 6, 6 ]
-------------------
Water Flows
-------------------
[
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 0, 0 ],
    waterflowCoords: [ '(0,0)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 0, 1 ],
    waterflowCoords: [ '(0,1)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 0, 2 ],
    waterflowCoords: [ '(0,2)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 1, 0 ],
    waterflowCoords: [ '(1,0)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 1, 1 ],
    waterflowCoords: [ '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 1, 2 ],
    waterflowCoords: [ '(1,2)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 2, 0 ],
    waterflowCoords: [ '(2,0)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 2, 1 ],
    waterflowCoords: [ '(2,1)', '(1,1)' ]
  },
  {
    basinCoords: [ 1, 1 ],
    originCoords: [ 2, 2 ],
    waterflowCoords: [ '(2,2)', '(1,1)' ]
  },
  {
    basinCoords: [ 3, 0 ],
    originCoords: [ 3, 0 ],
    waterflowCoords: [ '(3,0)' ]
  },
  {
    basinCoords: [ 3, 1 ],
    originCoords: [ 3, 1 ],
    waterflowCoords: [ '(3,1)' ]
  },
  {
    basinCoords: [ 3, 2 ],
    originCoords: [ 3, 2 ],
    waterflowCoords: [ '(3,2)' ]
  }
]
-------------------
Basins
-------------------
[
  {
    basinCoords: [ 1, 1 ],
    points: [
      '(0,0)', '(1,1)', '(0,1)',
      '(1,1)', '(0,2)', '(1,1)',
      '(1,0)', '(1,1)', '(1,1)',
      '(1,2)', '(1,1)', '(2,0)',
      '(1,1)', '(2,1)', '(1,1)',
      '(2,2)', '(1,1)'
    ]
  },
  { basinCoords: [ 3, 0 ], points: [ '(3,0)' ] },
  { basinCoords: [ 3, 1 ], points: [ '(3,1)' ] },
  { basinCoords: [ 3, 2 ], points: [ '(3,2)' ] }
]
```