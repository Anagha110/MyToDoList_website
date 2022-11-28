
//validation for login
function validations() {
    if ((document.getElementById("Username").value == "admin") && (document.getElementById("pwd").value == "12345")) {

        alert("login successful");

        setTimeout(function () { window.location = "home.html" });//using callback function for redirect to next page
    }
    else {
        alert("access denied, valid username and password required");
    }
}


//dynamically creating table and fetching data from external api using ajax

const tablebody = document.querySelector("#todotable > tbody")
function ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            //Create a HTML Table element.
            var table = document.createElement("table");
            table.style.border = "1.5px solid black";

            //Add the header row.
            var row = table.insertRow(-1);
            row.style.border = "1.5px solid black";

            //Add the header cells.
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = "Id";
            row.appendChild(headerCell);
            headerCell.style.border = "1.5px solid black";
            headerCell.style.backgroundColor = "#ffffff";
            headerCell.style.padding = "5px";

            headerCell = document.createElement("TH");
            headerCell.innerHTML = "description";
            row.appendChild(headerCell);
            headerCell.style.border = "1.5px solid black";
            headerCell.style.backgroundColor = "#ffffff";
            headerCell.style.padding = "5px";

            headerCell = document.createElement("TH");
            headerCell.innerHTML = "status";
            row.appendChild(headerCell);
            headerCell.style.border = "1.5px solid black";
            headerCell.style.backgroundColor = "#ffffff";
            headerCell.style.padding = "5px";




            for (var i = 0; i < response.length; i++) {
                //Add the data row.
                var row = table.insertRow(-1);
                row.style.border = "1.5px solid black";


                //Add the data cells.
                var cell = row.insertCell(-1);
                cell.innerHTML = response[i].id;
                cell.style.border = "1.5px solid black";

                cell = row.insertCell(-1);
                cell.innerHTML = response[i].title;
                cell.style.border = "1.5px solid black";


                cell = row.insertCell(-1);
                var chk = document.createElement('input');
                cell.style.border = "1.5px solid black";

                chk.type = "checkbox";
                chk.id = "checkid"
                cell.appendChild(chk);
                if (response[i].completed == false) {

                    chk.disabled = true;


                }

                //alert message while selecting checkbox using promise

                var promise = new Promise(function (resolve, reject) {  //1.create promise variable
                    chk.addEventListener('click', function (event) {
                        var checkboxLimit = 5;
                        var array = [];
                        var checkedvalue = document.querySelectorAll('input[type=checkbox]:checked');
                        let counter = 0;
                        for (let i = 0; i < checkedvalue.length; i++) { //to update counter each time a checkbox gets changed
                            if (checkedvalue[i].checked) {
                                counter++;
                            }
                        }
                        if (checkboxLimit < counter) {

                            resolve(" Congrats. 5 Tasks have been Successfully Completed ");

                            event.preventDefault();

                        }
                    }, false);
                });
                promise.then(
                    function (value) { alert(value); });
            }

            var dvTable = document.getElementById("todotable");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);
        }

    }
    xhttp.open("GET", 'https://jsonplaceholder.typicode.com/todos', true);
    xhttp.send();
}


