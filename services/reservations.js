const getAlphabet = (i) => {
    switch (i) {
        case 0:
            return 'A'
        case 1:
            return 'B'
        case 2:
            return 'C'
        case 3:
            return 'D'
        case 4:
            return 'E'
        case 5:
            return 'F'
        case 6:
            return 'G'
        case 7:
            return 'H'
        case 8:
            return 'J'
        case 9:
            return 'K'
        default:
            return ''
    }
}

const main = (N, M) => {
    console.log(M.split(' '))

    let rowLength = 10
    let reservedSeats = M.split(' ')
    let rows = []

    for(let i=1; i <= N; i++){
        let row = []
        for(let j=0; j < rowLength; j++){
            let seat = {
                spot: j,
                alphabet: getAlphabet(j),
                position: j < 3 ? 'left' : ( j < 7 ? 'middle' : 'right'),
                reserved: reservedSeats
                            .filter(seat => seat.includes(i))
                            .find(seat => seat.charAt(1) === getAlphabet(j)) ? true : false,
            }
            row.push(seat)
        }
        rows.push(row)
    }

    let potentialFamilyAllocates = []
    rows.forEach((row, i) => {
        let allocated = {left: false, middle: false, right: false}

        row.forEach((seat, j) => {
            if(!seat.reserved){
                if(j+3 < row.length && !row[j+1].reserved && !row[j+2].reserved && !row[j+3].reserved){
                    let newFamilyAllocate = [row[j], row[j+1], row[j+2], row[j+3]]

                    let combination = {left: 0, middle: 0, right: 0}
                    newFamilyAllocate.forEach(seat => {
                        seat.position === 'left'    ? combination.left += 1 
                                                    : (seat.position === 'middle' 
                                                    ? combination.middle += 1 
                                                    : combination.right += 1)
                    })
                    if(combination.middle === 2 && combination.left === 2 && !allocated.middle){
                        potentialFamilyAllocates.push(newFamilyAllocate)
                        allocated.left = true
                    }
                    if(combination.middle === 2 && combination.right === 2 && !allocated.middle){
                        potentialFamilyAllocates.push(newFamilyAllocate)
                        allocated.right = true
                    }
                    if(combination.middle === 4 && !allocated.left && !allocated.right){
                        potentialFamilyAllocates.push(newFamilyAllocate)
                        allocated.middle = true
                    }
                }
            }
        })
    })
    const numberOfFamilyAllocates = potentialFamilyAllocates.length
    return numberOfFamilyAllocates
}

module.exports = { main }