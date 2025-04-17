const sum = () => {
    let result = 0;

    for (let i = 0; i < 9e9; i++) result += 1;

    return result
}

export default sum;