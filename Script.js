matrix = [[1,2,3],[4,5,6],[7,8,9]]
var rotate = function (matrix) {
  n = matrix.length
   for(let i=0; i<n; i++) {
    for(let j=i; j<n; j++) {
      matrix.flat();
       [matrix[i][j], matrix[j][i]] =
      [matrix[j][i], matrix[i][j]];
    }
   }
    for (let row of matrix) {
    row.reverse();
  }
  return matrix;
};
console.log(rotate(matrix));
