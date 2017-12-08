export function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

export function validatePassword(password) {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(password);
}

export function mapper(array) {
    array = JSON.stringify(array);
    array = JSON.parse(array);
    for(var i=0; i < array.length; i++) {
        array[i] = JSON.parse(array[i]);
    }
    return array;
}
