//window.onscroll = function() {myFunction()};

//let header = document.getElementById("");

function myFunction() {
   /* if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }*/
}

window.onload = (event) => {
    let circle1 = document.getElementById("circle1")
    let circle2 = document.getElementById("circle2")
    let line1 = document.getElementById("vLine1")

    let circle1Coords = circle1.getBoundingClientRect()
    let circle2Coords = circle2.getBoundingClientRect()
    let line1Coords = line1.getBoundingClientRect()
    let form = document.getElementById("form1")
    let emailField = document.getElementById("email").value
    let instField = document.getElementById("inst").value

    const email = emailField.nodeValue
    const inst = instField.nodeValue



   form.addEventListener('submit', function (event) {

        if(!emailField && !instField) {
            console.log("err")
            event.preventDefault();
        }
        else {
            event.submit()
            console.log("заебись")

        }

    });



    //line1.style.height =
};



