const nullHandlersMany = (list) => {
    let ans = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const field = item[0];
        const errorMes = item[1];

        if (!field) {
            ans += `${errorMes}`
        }
        break;
    }

    return ans;
}

module.exports = {
    nullHandlersMany
}