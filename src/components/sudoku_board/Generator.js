class Sudoku {
    constructor(N, K) {
        if (this.mat === undefined)
            this.mat = null;
        if (this.N === undefined)
            this.N = 0;
        if (this.SRN === undefined)
            this.SRN = 0;
        if (this.K === undefined)
            this.K = 0;
        this.N = N;
        this.K = K;
        var SRNd = Math.sqrt(N);
        this.SRN = (SRNd | 0);
        this.mat = (function (dims) {
            var allocate = function (dims) {
                if (dims.length === 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            }; return allocate(dims);
        })([N, N]);
    }
    fillValues = () => {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.removeKDigits();
    };
    fillDiagonal = () => {
        for (var i = 0; i < this.N; i = i + this.SRN) {
            this.fillBox(i, i);
        }
    };
    unUsedInBox = (rowStart, colStart, num) => {
        for (var i = 0; i < this.SRN; i++) {
            for (var j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num)
                    return false;
            }
        }
        return true;
    };
    fillBox = (row, col) => {
        var num;
        for (var i = 0; i < this.SRN; i++) {

                for (var j = 0; j < this.SRN; j++) {
     
                        do {
                        
                                num = this.randomGenerator(this.N);
                      
                        } while ((!this.unUsedInBox(row, col, num)));
                        this.mat[row + i][col + j] = num;
                    ;
                }

        }
    };
    randomGenerator = (num) => {
        return (Math.floor((Math.random() * num + 1)) | 0);
    };

    CheckIfSafe = (i, j, num) => {
        return (this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num));
    };
    unUsedInRow = (i, num) => {
        for (var j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num)
                return false;
            ;
        }
        return true;
    };

    unUsedInCol = (j, num) => {
        for (var i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num)
                return false;
            ;
        }
        return true;
    };

    fillRemaining = (i, j) => {
        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N)
            return true;
        if (i < this.SRN) {
            if (j < this.SRN)
                j = this.SRN;
        }
        else if (i < this.N - this.SRN) {
            if (j === (((i / this.SRN | 0)) | 0) * this.SRN)
                j = j + this.SRN;
        }
        else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N)
                    return true;
            }
        }
        for (var num = 1; num <= this.N; num++) {
          
                if (this.CheckIfSafe(i, j, num)) {
                    this.mat[i][j] = num;
                    if (this.fillRemaining(i, j + 1))
                        return true;
                    this.mat[i][j] = 0;
                }

        }
        return false;
    };

    removeKDigits = function () {
        var count = this.K;
        while ((count !== 0)) {
          
                var cellId = this.randomGenerator(this.N * this.N);
                var i = ((cellId / this.N | 0));
                var j = cellId % 9;
                if (j !== 0)
                    j = j - 1;
                if (i === 9)
                    i = i - 1;
                if (this.mat[i][j] !== 0) {
                    count--;
                    this.mat[i][j] = 0;
                }
       
        }

    };


    printSudoku = () => {
        return (this.mat)
    };
}
export default Sudoku