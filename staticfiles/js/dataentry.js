
document.addEventListener('DOMContentLoaded', function () {

    populateCommodities();
    populateProjects();
    populateFromSource();
    populateToDestination();
    populateCustomers();
    populateWagonList();

    function populateCommodities() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/commodities';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdown = document.getElementById("commodity");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_commodity";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].commodity + "select_commodity";
                    newSelectOption.value = data[x].commodity;
                    newSelectOption.innerHTML = data[x].commodity;
                    dropdown.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }





    function populateProjects() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/projects';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdown = document.getElementById("projects");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_project";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].projects + "select_project";
                    newSelectOption.value = data[x].projects;
                    newSelectOption.innerHTML = data[x].projects;
                    dropdown.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }



    function populateWagonList() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/wagonlist';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdown = document.getElementById("wagon_number");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_wagon_number";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].wagon_id + "select_wagon_number";
                    newSelectOption.value = data[x].wagon_id;
                    newSelectOption.innerHTML = data[x].wagon_id;
                    dropdown.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function populateCustomers() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/customers';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdown = document.getElementById("customer");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_customer";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].customer + "select_customer";
                    newSelectOption.value = data[x].customer;
                    newSelectOption.innerHTML = data[x].customer;
                    dropdown.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function populateFromSource() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/locations';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdownfrom_source = document.getElementById("from_source");
                dropdownfrom_source.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_from";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdownfrom_source.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_from";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdownfrom_source.appendChild(newSelectOption);
                }


                var dropdownorigin = document.getElementById("origin");
                dropdownorigin.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_origin";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdownorigin.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_origin";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdownorigin.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    function populateToDestination() {
        dhis_uname = '';
        dhis_pwd = '';
        var base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);

        dhis_uname = 'rgava';
        dhis_pwd = 'Firefly99';
        base64Credentials = btoa(dhis_uname + ':' + dhis_pwd);
        apiUrl = '/api/locations';


        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                var dropdownto_destination = document.getElementById("to_destination");
                dropdownto_destination.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_to";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdownto_destination.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_to";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdownto_destination.appendChild(newSelectOption);
                }


                var dropdowndestination = document.getElementById("destination");
                dropdowndestination.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_destination";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdowndestination.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_destination";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdowndestination.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

});