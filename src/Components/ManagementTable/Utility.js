export function sorter(index, order, content, setContentHook) {
    const tempContent = [...content];
    const orderSign = order === 'ASC' ? 1 : -1;
    tempContent.sort((a, b) => {
        if (!isNaN(a[index]) && !isNaN(parseFloat(a[index])) &&
            !isNaN(b[index]) && !isNaN(parseFloat(b[index]))) {
            return (parseFloat(a[index]) - parseFloat(b[index])) * orderSign;
        }
        else if ((new Date(a[index])) !== 'Invalid Date' && !isNaN(new Date(a[index])) &&
            (new Date(b[index])) !== 'Invalid Date' && !isNaN(new Date(b[index]))
            && !a[index].match(/([A-Za-z]-)+/g)) {
            return ((new Date(a[index])) > (new Date(b[index])) ? 1 : (new Date(a[index])) === (new Date(b[index])) ? 0 : -1 ) * orderSign;
        }
        else if (a[index] > b[index]) {
            return orderSign;
        }
        else if (a[index] < b[index]) {
            return -1 * orderSign;
        }
        else {
            return 0;
        }
    });
    setContentHook(tempContent);
}