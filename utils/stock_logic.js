//utility function required for api
exports.generateRandomValues = function (initialVal) {
    const retArray = [];
    for (let i = 0, curDate = new Date(); i < 365; i++, curDate.setDate(curDate.getDate() - 1)) {
        const zero_one = +(Math.random() * 1).toFixed();
        const abschange = +(Math.random() * 9).toFixed(2);
        if (zero_one) {
            initialVal += abschange;
        } else {
            initialVal -= abschange;
        }
        retArray.push({
            Date: curDate.toISOString(),
            Value: +initialVal.toFixed(2)
        });
    }
    return retArray;
};
