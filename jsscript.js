

class gameBoard {
    constructor() {
        this.board = {};
        

    }

        addEdge(graph=this.board, vertexA, vertexB) {
        if (!graph[vertexA].includes(vertexB)) {
        graph[vertexA].push(vertexB);
        }
    }

        legalMovesFrom (row, col, boardSize=8) {
            let moveOffsets = [[-1,-2], [1,-2], [2,-1], [2,1], [1,2], [-1,2], [-2,1], [-2,-1]];
            let legalMoves = [];
            for (const offset of moveOffsets) {
                let moveRow = row + offset[0];
                let moveCol = col + offset[1];
                let totalMove = [];
                if (0 <= moveRow && moveRow < boardSize) {
                    totalMove.push(moveRow);
                }
                if (0 <= moveCol && moveCol < boardSize) {
                    totalMove.push(moveCol);
                }
                if (totalMove.length > 1) {
                    legalMoves.push(totalMove);
                }
            }
            return legalMoves; 
        }


        buildGraph(boardsize=8) {
            let graph = this.board;

            for (let i=0; i<boardsize; ++i) {
                for (let j=0; j<boardsize; ++j) {
                    let square = [i,j];
                    graph[square] = [];
                }
            }
            

            for (let row=0; row<boardsize; ++row) {
                for (let col=0; col<boardsize; ++col) {
                    let vertex = [row,col];
                    let possMoves = this.legalMovesFrom(row, col);
                    for (const move of possMoves) {
                    this.addEdge(graph, vertex, move)
                    }
                }
            }
        return graph;       
        }


    knightMoves (start, end, boardSize=8) {
        let graph = this.buildGraph(boardSize);

        let queue = [];
        let visited = new Set();
        let path = [];

        queue.push(start);
        visited.add(start);
        path.push(start);

        while((queue[queue.length-1][0] !== end[0]) && (queue[queue.length-1][1] !== end[1])) {
            
            let first = queue[0];
            if (path.length >= 1) {
            let last = path[path.length-1];
            if ((Math.abs(last[0]-first[0]) == 2) && (Math.abs(last[1]-first[1]) == 1)) {
                path.push(first);
            }
            if ((Math.abs(last[0]-first[0]) == 1) && (Math.abs(last[1]-first[1]) == 2)) {
                path.push(first);
            }
            }
            queue.shift();
            
            let allMoves = graph[first];
            for (const move of allMoves) {
                if (!visited.has(move) && (move[0] !== end[0]) && (move[1] !== end[1])) {
                    visited.add(move);
                    queue.push(move);
                }
                if ((move[0] == end[0]) && (move[1] == end[1])) {
                    queue.push(move);
                    break;
                }
            }
        }

        path.push(end);
        return path;
        
        }
    }

    function knightMoves(start, end) {
        let board = new gameBoard();
        let knightPath = board.knightMoves(start, end);
        return knightPath;
    }