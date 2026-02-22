function showLastName() {
    const lastName = "Sofela";
    return lastName;
}

// Define another function 
function displayFullName() {
    const fullName = "Oluwatobi"  +  showLastName();
    return fullName;
}
// invoke displayFullName
console.log(displayFullName())

//invocation will be Writen
 "Oluwatobi Sofela"
