export function sorter(index, order, content, setContentHook) {
    const tempContent = [...content];
    const orderSign = order === 'ASC' ? 1 : -1;
    tempContent.sort((a, b) => {
        // integer sort
        if (!isNaN(a[index]) && !isNaN(parseFloat(a[index])) &&
            !isNaN(b[index]) && !isNaN(parseFloat(b[index]))) {
            return (parseFloat(a[index]) - parseFloat(b[index])) * orderSign;
        }
        // date sort
        else if ((new Date(a[index])) !== 'Invalid Date' && !isNaN(new Date(a[index]))
            && (new Date(b[index])) !== 'Invalid Date' && !isNaN(new Date(b[index]))
            && !a[index].match(/([A-Za-z])+/g) && !b[index].match(/([A-Za-z])+/g)) {
            return ((new Date(a[index])) > (new Date(b[index])) ? 1 : (new Date(a[index])) < (new Date(b[index])) ? -1 : 0) * orderSign;
        }
        // string sort (default)
        else if (a[index].toLowerCase() > b[index].toLowerCase()) {
            return orderSign;
        }
        else if (a[index].toLowerCase() < b[index].toLowerCase()) {
            return -1 * orderSign;
        }
        else {
            return 0;
        }
    });
    setContentHook(tempContent);
}

export const convertDateFormat = (dateStr) => {
    if (new RegExp('^\\d{1,2}/\\d{1,2}/\\d{2,4}$').test(dateStr)) {
        const dateSplit = dateStr.split('/');
        return new Date(`${dateSplit[1]}-${dateSplit[0]}-${dateSplit[2]}`);
    }
    else if (!isNaN(new Date(dateStr)) && !RegExp('[a-zA-Z]').test(dateStr)) {
        return new Date(dateStr);
    }
    return null;
}

export const convertShortenDateFormat = (dateStr) => {
    if (new RegExp('^\\d{1,2}/\\d{2,4}$').test(dateStr)) {
        const dateSplit = dateStr.split('/');
        return new Date(`${dateSplit[0]}-1-${dateSplit[1]}`);
    }
    return null;
}

export const convertRangeDateFormat = (dateStr) => {
    if (new RegExp('^\\d{1,2}/\\d{1,2}/\\d{2,4}-\\d{1,2}/\\d{1,2}/\\d{2,4}$').test(dateStr)) {
        const twoDate = dateStr.split('-');
        const dateOneSplit = twoDate[0].split('/');
        const dateTwoSplit = twoDate[1].split('/');
        return [
            new Date(`${dateOneSplit[1]}-${dateOneSplit[0]}-${dateOneSplit[2]}`),
            new Date(`${dateTwoSplit[1]}-${dateTwoSplit[0]}-${dateTwoSplit[2]}`)
        ]
    }
    return null;
}

export const convertRangeShortenDateFormat = (dateStr) => {
    if (new RegExp('^\\d{1,2}/\\d{2,4}-\\d{1,2}/\\d{2,4}$').test(dateStr)) {
        const twoDate = dateStr.split('-');
        const dateOneSplit = twoDate[0].split('/');
        const dateTwoSplit = twoDate[1].split('/');
        // Prevent 19 prefix in years
        const boundYear = dateTwoSplit[1].length === 2 ? `20${dateTwoSplit[1]}` : dateTwoSplit[1]
        return [
            new Date(`${dateOneSplit[0]}-1-${dateOneSplit[1]}`),
            new Date(boundYear, dateTwoSplit[0], 0)
        ];
    }
    return null;
}