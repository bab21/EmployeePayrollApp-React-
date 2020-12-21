export const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}([\\s][A-Z]{1}[a-z]{2,})?$');
    if (!nameRegex.test(name)) throw "Name is Incorrect!";
}
