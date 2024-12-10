document.addEventListener('DOMContentLoaded', function () {

    var selectedSerialNumber = 'Unattached';
    const attachWagonBtn = document.getElementById("attach-wagon");
    const attachLocoBtn = document.getElementById("attach-locomotive");
    const attachWagonBlock = document.getElementById("left-box");
    const attachLocoBlock = document.getElementById("locomotive-box");
    const wagons_close_button = document.getElementById("close_wagons_state_btn");
    const locomotives_save_close_button = document.getElementById("close_locomotives_state_btn");
    const edit_train = document.getElementById("editModal");

    populateFromSource();
    populateToDestination();

    
    // Fetch username using the Fetch API
    fetch('/get-username/')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch username');
            }
        })
        .then(data => {
            if (data.username) {
                console.log('Username:', data.username); // Use the username as needed
                console.log('Location:', data.location);
                getAllTrains(data.location);
                //document.getElementById('usernameDisplay').innerText = data.username; // Example of displaying it
            } else {
                console.error(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


    document.getElementById('view-train-entries').addEventListener('click', function () {
        getAllTrainTransactions(selectedSerialNumber);
        document.getElementById('trainTransactionsModal').style.display = 'block';
    });

    document.getElementById('view-attached-wagons').addEventListener('click', function () {
        document.getElementById('right-box').style.display = 'block';
    });

    document.getElementById('close_attached_wagons_state_btn').addEventListener('click', function () {
        document.getElementById('right-box').style.display = 'none';
    });

    document.getElementById('view-attached-locomotives').addEventListener('click', function () {
        document.getElementById('attached-locomotives-box').style.display = 'block';
    });

    document.getElementById('close_attached_loco_state_btn').addEventListener('click', function () {
        document.getElementById('attached-locomotives-box').style.display = 'none';
    });



    //filter by text entered in the serial search
    document.getElementById('serial_search').addEventListener('input', function () {
        // Get the input value and convert it to lowercase for case-insensitive comparison
        const searchValue = this.value.toLowerCase();
        // Select all items in the scrollable-content div
        const items = document.querySelectorAll('#scrollable-content .selectable');
        // Loop through each item and compare the text with the search value
        items.forEach(function (item) {
            const serialNumber = item.querySelector('.serial-no').textContent.toLowerCase();
            if (serialNumber.includes(searchValue)) {
                // If the search value matches, display the item
                item.style.display = '';
            } else {
                // Otherwise, hide the item
                item.style.display = 'none';
            }
        });
    });


    //filter by text entered in the serial search
    /* document.getElementById('location-dropdown').addEventListener('change', function () {
         // Get the input value and convert it to lowercase for case-insensitive comparison
         alert('hw far');
         const searchValue = this.value.toLowerCase();
         console.log(searchValue);
         // Select all items in the scrollable-content div
         const items = document.querySelectorAll('#scrollable-content .selectable');
         // Loop through each item and compare the text with the search value
         items.forEach(function (item) {
             const serialNumber = item.querySelector('.from').textContent.toLowerCase();
             if (serialNumber.includes(searchValue)) {
                 // If the search value matches, display the item
                 item.style.display = '';
             } else {
                 // Otherwise, hide the item
                 item.style.display = 'none';
             }
         });
     });*/

    //Ranga note when using select 2 the traditional document select by id doesnt work
    //filter by text entered in the serial search
    $('#location-dropdown').on('change', function () {
        const searchValue = this.value.toLowerCase();
        console.log(searchValue);

        // Select all items in the scrollable-content div
        const items = document.querySelectorAll('#scrollable-content .selectable');

        // Loop through each item and compare the text with the search value
        items.forEach(function (item) {
            const serialNumber = item.querySelector('.from').textContent.toLowerCase();
            if (serialNumber.includes(searchValue)) {
                // If the search value matches, display the item
                item.style.display = '';
            } else {
                // Otherwise, hide the item
                item.style.display = 'none';
            }
        });
    });


    $('#status-dropdown').on('change', function () {
        const searchValue = this.value.toLowerCase();
        console.log(searchValue);

        // Select all items in the scrollable-content div
        const items = document.querySelectorAll('#scrollable-content .selectable');

        // Loop through each item and compare the text with the search value
        items.forEach(function (item) {
            const serialNumber = item.querySelector('.status').textContent.toLowerCase();
            if (serialNumber.includes(searchValue)) {
                // If the search value matches, display the item
                item.style.display = '';
            } else {
                // Otherwise, hide the item
                item.style.display = 'none';
            }
        });
    });


    document.addEventListener('dblclick', function (e) {
        // Check if the clicked target is part of the selectable elements
        // selectedSerialNumber = e.currentTarget.dataset.value;

        if (e.target.closest('.selectable')) {
            fetchTrainData(selectedSerialNumber);
            //edit_train.style.display = 'block';
        } else if (e.target.closest('.attached-selectable')) {
            const currentlySelected = document.querySelector('.attached-selectable.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }

            // Add the 'selected' class to the clicked element
            e.target.closest('.attached-selectable').classList.add('selected');
        } else if (e.target.closest('.unattached-selectable')) {
            const currentlySelected = document.querySelector('.unattached-selectable.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }

            // Add the 'selected' class to the clicked element
            e.target.closest('.unattached-selectable').classList.add('selected');
        }
    });

    attachWagonBtn.addEventListener('click', (e) => {
        attachWagonBlock.style.display = "block";
    });

    attachLocoBtn.addEventListener('click', (e) => {
        attachLocoBlock.style.display = "block";
    });

    wagons_close_button.addEventListener('click', (e) => {

        const attachedWagonsDiv = document.getElementById('attached-wagons');
        const wagonDivs = attachedWagonsDiv.querySelectorAll('.attached-selectable');
        const trainValue = selectedSerialNumber;

        wagonDivs.forEach((wagonDiv) => {

            const wagonNumber = wagonDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/wagon/${wagonNumber}/update_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: trainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })

                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });


        attachWagonBlock.style.display = "none";
    });


    locomotives_save_close_button.addEventListener('click', (e) => {

        const attachedWagonsDiv = document.getElementById('attached-locomotive-scrollable-content');
        const locoDivs = attachedWagonsDiv.querySelectorAll('.attached-selectable');
        const trainValue = selectedSerialNumber;

        locoDivs.forEach((locoDiv) => {

            const locoNumber = locoDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/locomotive/${locoNumber}/update_loco_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: trainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })

                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });

        document.getElementById('locomotive-box').style.display = "none";
        //attachWagonBlock.style.display = "none";
    });


    document.getElementById('attached_close_loco_state_btn').addEventListener('click', (e) => {

        const attachedWagonsDiv = document.getElementById('locomotive-scrollable-content');
        const locoDivs = attachedWagonsDiv.querySelectorAll('.unattached-selectable');
        const trainValue = "Unattached";

        locoDivs.forEach((locoDiv) => {

            const locoNumber = locoDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/locomotive/${locoNumber}/update_loco_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: trainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })

                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });
        alert('Update success');
        //document.getElementById('locomotive-box').style.display = "none";
        //attachWagonBlock.style.display = "none";
    });


    //getAllTrains();
    
    getAllUnattachedWagons();
    getAllUnattachedLocos();

    const wagons_save_button = document.getElementById("save_wagons_state_btn");
    /*const unattached_wagons_save_button = document.getElementById("save_unattached_wagons_state_btn");



    unattached_wagons_save_button.addEventListener('click', function () {

        const attachedWagonsDiv = document.getElementById('attached-wagons');
        const wagonDivs = attachedWagonsDiv.querySelectorAll('.attached-selectable');
        const trainValue = selectedSerialNumber;

        wagonDivs.forEach((wagonDiv) => {

            const wagonNumber = wagonDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/wagon/${wagonNumber}/update_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: trainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })

                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });



        alert('Updated success!');


    });*/


    wagons_save_button.addEventListener('click', function () {

        const attachedWagonsDiv = document.getElementById('attached-wagons');
        const wagonDivs = attachedWagonsDiv.querySelectorAll('.attached-selectable');
        const trainValue = selectedSerialNumber;

        wagonDivs.forEach((wagonDiv) => {
            //console.log(wagonDiv.dataset.value);
            const wagonNumber = wagonDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/wagon/${wagonNumber}/update_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: trainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })

                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });






        const detachedWagonsDiv = document.getElementById('wagon-scrollable-content');
        const detachedwagonDivs = detachedWagonsDiv.querySelectorAll('.unattached-selectable');
        const detachedtrainValue = 'Unattached';

        detachedwagonDivs.forEach((wagonDiv) => {
            //console.log(wagonDiv.dataset.value);
            const wagonNumber = wagonDiv.dataset.value;  // Replace with the actual wagon number
            fetch(`/wagon/${wagonNumber}/update_train_ajax/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //  'X-CSRFToken': csrftoken, // Include CSRF token
                },
                body: JSON.stringify({
                    train: detachedtrainValue
                })
            })
                .then(response => {
                    // Check if response is JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                })
                /*.then(data => {
                    if (data.status === 'success') {
                        alert('Train updated successfully!');
                    } else {
                        alert('Error: ' + data.message);
                    }
                })*/
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        });


        alert('Updated success!');


    });


    function populateLocations() {
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

                var dropdown = document.getElementById("location-dropdown");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_location";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_location";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdown.appendChild(newSelectOption);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function fetchTrainData(serialNo) {
        fetch(`/get_train_data/${serialNo}/`)
            .then(response => response.json())
            .then(data => {
                // Populate modal with train data
                document.getElementById('serial_number').value = data.serial_number;
                document.getElementById('train_number').value = data.train_number;
                document.getElementById('from_source').value = data.from_source;
                document.getElementById('to_destination').value = data.to_destination;
                document.getElementById('departure_date').value = data.departure_date;
                document.getElementById('departure_time').value = data.departure_time;
                document.getElementById('arrival_date').value = data.arrival_date;
                document.getElementById('arrival_time').value = data.arrival_time;
                document.getElementById('status').value = data.status;
                // Show the modal
                document.getElementById('editModal').style.display = 'block';
            });
    }



    // Handle modal form submission
    document.getElementById('editForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const serialNumber = document.getElementById('serial_number').value;
        const formData = new FormData(this);

        fetch(`/update_train_record/${serialNumber}/`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Record updated successfully!');
                    // Close the modal
                    document.getElementById('editModal').style.display = 'none';
                    location.reload(); // Optionally, reload the page to reflect changes
                }
            });
    });

    // Handle modal close
    document.querySelector('.close').onclick = function () {
        document.getElementById('editModal').style.display = 'none';
    };

    document.querySelector('.close_transactions').onclick = function () {
        document.getElementById('trainTransactionsModal').style.display = 'none';
    };


    function getAllTrainsDELETE() {
        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = '/api/trains';
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {
                //console.log(data)

                mainDiv = document.getElementById("scrollable-content");
                mainDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "selectable";
                    rowDiv.dataset.value = data[x].serial_number

                    serialNoDiv = document.createElement("div");
                    serialNoDiv.className = "serial-no";
                    serialNoDiv.innerHTML = data[x].serial_number;

                    trainNoDiv = document.createElement("div");
                    trainNoDiv.className = "train-no";
                    trainNoDiv.innerHTML = data[x].train_number;


                    fromDiv = document.createElement("div");
                    fromDiv.className = "from";
                    fromDiv.innerHTML = data[x].from_source;

                    toDiv = document.createElement("div");
                    toDiv.className = "to";
                    toDiv.innerHTML = data[x].to_destination;

                    depDateDiv = document.createElement("div");
                    depDateDiv.className = "dep-date";
                    depDateDiv.innerHTML = data[x].departure_date;

                    depTimeDiv = document.createElement("div");
                    depTimeDiv.className = "dep-time";
                    depTimeDiv.innerHTML = data[x].departure_time;

                    arrDateDiv = document.createElement("div");
                    arrDateDiv.className = "arr-date";
                    arrDateDiv.innerHTML = data[x].arrival_date;

                    arrTimeDiv = document.createElement("div");
                    arrTimeDiv.className = "arr-time";
                    arrTimeDiv.innerHTML = data[x].arrival_time;

                    statusDiv = document.createElement("div");
                    statusDiv.className = "status";
                    statusDiv.innerHTML = data[x].status;



                    rowDiv.addEventListener('click', (e) => {
                        e.preventDefault();
                        selectedSerialNumber = e.currentTarget.dataset.value;
                        //alert(selectedSerialNumber);
                        document.getElementById("selected-train").innerHTML = selectedSerialNumber;
                        document.getElementById("selected-train").style.color = "green";

                        getAllAttachedWagons(selectedSerialNumber);
                        getAllAttachedLocos(selectedSerialNumber);
                        //alert(e.currentTarget.dataset.value); // Use e.currentTarget to access the clicked row's dataset if you dont do this you get the last row always
                    })

                    rowDiv.appendChild(serialNoDiv);
                    rowDiv.appendChild(trainNoDiv);
                    rowDiv.appendChild(fromDiv);
                    rowDiv.appendChild(toDiv);
                    rowDiv.appendChild(depDateDiv);
                    rowDiv.appendChild(depTimeDiv);
                    rowDiv.appendChild(arrDateDiv);
                    rowDiv.appendChild(arrTimeDiv);
                    rowDiv.appendChild(statusDiv);

                    mainDiv.appendChild(rowDiv);
                }




            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function getAllTrains(user_location) {
        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        //var apiUrl = '/api/trains';
        var apiUrl = '/api/trains?to_destination=' + user_location
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {
                //console.log(data)

                mainDiv = document.getElementById("scrollable-content");
                mainDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "selectable";
                    rowDiv.dataset.value = data[x].serial_number

                    serialNoDiv = document.createElement("div");
                    serialNoDiv.className = "serial-no";
                    serialNoDiv.innerHTML = data[x].serial_number;

                    trainNoDiv = document.createElement("div");
                    trainNoDiv.className = "train-no";
                    trainNoDiv.innerHTML = data[x].train_number;


                    fromDiv = document.createElement("div");
                    fromDiv.className = "from";
                    fromDiv.innerHTML = data[x].from_source;

                    toDiv = document.createElement("div");
                    toDiv.className = "to";
                    toDiv.innerHTML = data[x].to_destination;

                    depDateDiv = document.createElement("div");
                    depDateDiv.className = "dep-date";
                    depDateDiv.innerHTML = data[x].departure_date;

                    depTimeDiv = document.createElement("div");
                    depTimeDiv.className = "dep-time";
                    depTimeDiv.innerHTML = data[x].departure_time;

                    arrDateDiv = document.createElement("div");
                    arrDateDiv.className = "arr-date";
                    arrDateDiv.innerHTML = data[x].arrival_date;

                    arrTimeDiv = document.createElement("div");
                    arrTimeDiv.className = "arr-time";
                    arrTimeDiv.innerHTML = data[x].arrival_time;

                    statusDiv = document.createElement("div");
                    statusDiv.className = "status";
                    statusDiv.innerHTML = data[x].status;



                    rowDiv.addEventListener('click', (e) => {
                        e.preventDefault();
                        selectedSerialNumber = e.currentTarget.dataset.value;
                        //alert(selectedSerialNumber);
                        document.getElementById("selected-train").innerHTML = selectedSerialNumber;
                        document.getElementById("selected-train").style.color = "green";

                        getAllAttachedWagons(selectedSerialNumber);
                        getAllAttachedLocos(selectedSerialNumber);
                        //alert(e.currentTarget.dataset.value); // Use e.currentTarget to access the clicked row's dataset if you dont do this you get the last row always
                    })

                    rowDiv.appendChild(serialNoDiv);
                    rowDiv.appendChild(trainNoDiv);
                    rowDiv.appendChild(fromDiv);
                    rowDiv.appendChild(toDiv);
                    rowDiv.appendChild(depDateDiv);
                    rowDiv.appendChild(depTimeDiv);
                    rowDiv.appendChild(arrDateDiv);
                    rowDiv.appendChild(arrTimeDiv);
                    rowDiv.appendChild(statusDiv);

                    mainDiv.appendChild(rowDiv);
                }




            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }


    function getAllTrainTransactions(sn) {
        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = '/api/traintransactions?serial_number=' + selectedSerialNumber;
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {
                //console.log(data)

                mainDiv = document.getElementById("transactions-scrollable-content");
                mainDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "selectable";
                    rowDiv.dataset.value = data[x].serial_number

                    serialNoDiv = document.createElement("div");
                    serialNoDiv.className = "serial-no";
                    serialNoDiv.innerHTML = data[x].serial_number;

                    trainNoDiv = document.createElement("div");
                    trainNoDiv.className = "train-no";
                    trainNoDiv.innerHTML = data[x].train_number;


                    fromDiv = document.createElement("div");
                    fromDiv.className = "from";
                    fromDiv.innerHTML = data[x].from_source;

                    toDiv = document.createElement("div");
                    toDiv.className = "to";
                    toDiv.innerHTML = data[x].to_destination;

                    depDateDiv = document.createElement("div");
                    depDateDiv.className = "dep-date";
                    depDateDiv.innerHTML = data[x].departure_date;

                    depTimeDiv = document.createElement("div");
                    depTimeDiv.className = "dep-time";
                    depTimeDiv.innerHTML = data[x].departure_time;

                    arrDateDiv = document.createElement("div");
                    arrDateDiv.className = "arr-date";
                    arrDateDiv.innerHTML = data[x].arrival_date;

                    arrTimeDiv = document.createElement("div");
                    arrTimeDiv.className = "arr-time";
                    arrTimeDiv.innerHTML = data[x].arrival_time;



                    rowDiv.addEventListener('click', (e) => {
                        e.preventDefault();
                        selectedSerialNumber = e.currentTarget.dataset.value;
                        //alert(selectedSerialNumber);
                        document.getElementById("selected-train").innerHTML = selectedSerialNumber;
                        document.getElementById("selected-train").style.color = "green";

                        getAllAttachedWagons(selectedSerialNumber);

                        //alert(e.currentTarget.dataset.value); // Use e.currentTarget to access the clicked row's dataset if you dont do this you get the last row always
                    })

                    rowDiv.appendChild(serialNoDiv);
                    rowDiv.appendChild(trainNoDiv);
                    rowDiv.appendChild(fromDiv);
                    rowDiv.appendChild(toDiv);
                    rowDiv.appendChild(depDateDiv);
                    rowDiv.appendChild(depTimeDiv);
                    rowDiv.appendChild(arrDateDiv);
                    rowDiv.appendChild(arrTimeDiv);
                    rowDiv.appendChild(statusDiv);

                    mainDiv.appendChild(rowDiv);
                }




            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function getAllUnattachedLocos() {
        document.getElementById("locomotive-scrollable-content").innerHTML = '';

        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = "/api/locos?train=Unattached";
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {


                mainWagonDiv = document.getElementById("locomotive-scrollable-content");
                mainWagonDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "unattached-selectable";
                    rowDiv.dataset.value = data[x].locomotive;

                    locomotiveNoDiv = document.createElement("div");
                    locomotiveNoDiv.className = "loco";
                    locomotiveNoDiv.innerHTML = data[x].locomotive;

                    ownerDiv = document.createElement("div");
                    ownerDiv.className = "loco";
                    ownerDiv.innerHTML = data[x].owner;

                    typeDiv = document.createElement("div");
                    typeDiv.className = "loco";
                    typeDiv.innerHTML = data[x].type;

                    weightDiv = document.createElement("div");
                    weightDiv.className = "loco";
                    weightDiv.innerHTML = data[x].weight;

                    trainDiv = document.createElement("div");
                    trainDiv.className = "loco";
                    trainDiv.innerHTML = data[x].train;


                    rowDiv.appendChild(locomotiveNoDiv);
                    rowDiv.appendChild(ownerDiv);
                    rowDiv.appendChild(typeDiv);
                    rowDiv.appendChild(weightDiv);
                    rowDiv.appendChild(trainDiv);

                    mainWagonDiv.appendChild(rowDiv);
                }

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function getAllAttachedWagons(train_number) {
        document.getElementById("attached-wagons").innerHTML = '';


        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = "/api/wagons?train=" + train_number;
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                document.getElementById('attached-wagons-label').innerHTML = data.length;
                if (data.length > 0) {
                    document.getElementById('view-attached-wagons').innerHTML = 'Click to view'
                    document.getElementById('attached-wagons-selected-train').innerHTML = '    Train serial : ' + train_number
                } else {
                    document.getElementById('view-attached-wagons').innerHTML = ''
                    document.getElementById('attached-wagons-selected-train').innerHTML = ''
                }
                mainWagonDiv = document.getElementById("attached-wagons");
                mainWagonDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "attached-selectable";
                    rowDiv.dataset.value = data[x].wagon_number;

                    wagonNoDiv = document.createElement("div");
                    wagonNoDiv.className = "wagon-number";
                    wagonNoDiv.innerHTML = data[x].wagon_number;

                    container_1Div = document.createElement("div");
                    container_1Div.className = "container-1";
                    container_1Div.innerHTML = data[x].container_1;

                    container_2Div = document.createElement("div");
                    container_2Div.className = "container-2";
                    container_2Div.innerHTML = data[x].container_2;

                    commodityDiv = document.createElement("div");
                    commodityDiv.className = "commodity";
                    commodityDiv.innerHTML = data[x].commodity;

                    customerDiv = document.createElement("div");
                    customerDiv.className = "customer";
                    customerDiv.innerHTML = data[x].customer;

                    netDiv = document.createElement("div");
                    netDiv.className = "net";
                    netDiv.innerHTML = data[x].net;

                    tare_weightDiv = document.createElement("div");
                    tare_weightDiv.className = "tar-weight";
                    tare_weightDiv.innerHTML = data[x].tare_weight;

                    originDiv = document.createElement("div");
                    originDiv.className = "origin";
                    originDiv.innerHTML = data[x].origin;

                    destinationDiv = document.createElement("div");
                    destinationDiv.className = "destination";
                    destinationDiv.innerHTML = data[x].destination;

                    projectsDiv = document.createElement("div");
                    projectsDiv.className = "projects";
                    projectsDiv.innerHTML = data[x].projects;

                    trainDiv = document.createElement("div");
                    trainDiv.className = "train";
                    trainDiv.innerHTML = data[x].train;

                    rowDiv.appendChild(wagonNoDiv);
                    rowDiv.appendChild(container_1Div);
                    rowDiv.appendChild(container_2Div);
                    rowDiv.appendChild(commodityDiv);
                    rowDiv.appendChild(customerDiv);
                    rowDiv.appendChild(netDiv);
                    rowDiv.appendChild(tare_weightDiv);
                    rowDiv.appendChild(originDiv);
                    rowDiv.appendChild(destinationDiv);
                    rowDiv.appendChild(projectsDiv);
                    rowDiv.appendChild(trainDiv);

                    mainWagonDiv.appendChild(rowDiv);
                }


            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function getAllAttachedLocos(train_number) {
        document.getElementById("attached-locomotive-scrollable-content").innerHTML = '';

        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = "/api/locos?train=" + train_number;
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {

                document.getElementById('attached-locomotives-label').innerHTML = data.length;
                if (data.length > 0) {
                    document.getElementById('view-attached-locomotives').innerHTML = 'Click to view'
                    document.getElementById('attached-locomotives-selected-train').innerHTML = '    Train serial : ' + train_number
                } else {
                    document.getElementById('view-attached-locomotives').innerHTML = ''
                    document.getElementById('attached-locomotives-selected-train').innerHTML = ''
                }


                mainLocoDiv = document.getElementById("attached-locomotive-scrollable-content");
                mainLocoDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "unattached-selectable";
                    rowDiv.dataset.value = data[x].locomotive;

                    locomotiveNoDiv = document.createElement("div");
                    locomotiveNoDiv.className = "locomotive";
                    locomotiveNoDiv.innerHTML = data[x].locomotive;

                    ownerDiv = document.createElement("div");
                    ownerDiv.className = "owner";
                    ownerDiv.innerHTML = data[x].owner;

                    typeDiv = document.createElement("div");
                    typeDiv.className = "type";
                    typeDiv.innerHTML = data[x].type;

                    weightDiv = document.createElement("div");
                    weightDiv.className = "commodity";
                    weightDiv.innerHTML = data[x].weight;

                    trainDiv = document.createElement("div");
                    trainDiv.className = "train";
                    trainDiv.innerHTML = data[x].train;


                    rowDiv.appendChild(locomotiveNoDiv);
                    rowDiv.appendChild(ownerDiv);
                    rowDiv.appendChild(typeDiv);
                    rowDiv.appendChild(weightDiv);
                    rowDiv.appendChild(trainDiv);

                    mainLocoDiv.appendChild(rowDiv);
                }

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function getAllUnattachedWagons() {
        document.getElementById("wagon-scrollable-content").innerHTML = '';

        uname = 'rgava';
        pwd = 'Firefly99';
        var base64Credentials = btoa(uname + ':' + pwd);
        var apiUrl = "/api/wagons?train=Unattached";
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + base64Credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();

            })
            .then(data => {


                mainWagonDiv = document.getElementById("wagon-scrollable-content");
                mainWagonDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "unattached-selectable";
                    rowDiv.dataset.value = data[x].wagon_number;

                    wagonNoDiv = document.createElement("div");
                    wagonNoDiv.className = "wagon-number";
                    wagonNoDiv.innerHTML = data[x].wagon_number;

                    container_1Div = document.createElement("div");
                    container_1Div.className = "container-1";
                    container_1Div.innerHTML = data[x].container_1;

                    container_2Div = document.createElement("div");
                    container_2Div.className = "container-2";
                    container_2Div.innerHTML = data[x].container_2;

                    commodityDiv = document.createElement("div");
                    commodityDiv.className = "commodity";
                    commodityDiv.innerHTML = data[x].commodity;

                    customerDiv = document.createElement("div");
                    customerDiv.className = "customer";
                    customerDiv.innerHTML = data[x].customer;

                    netDiv = document.createElement("div");
                    netDiv.className = "net";
                    netDiv.innerHTML = data[x].net;

                    tare_weightDiv = document.createElement("div");
                    tare_weightDiv.className = "tar-weight";
                    tare_weightDiv.innerHTML = data[x].tare_weight;

                    originDiv = document.createElement("div");
                    originDiv.className = "origin";
                    originDiv.innerHTML = data[x].origin;

                    destinationDiv = document.createElement("div");
                    destinationDiv.className = "destination";
                    destinationDiv.innerHTML = data[x].destination;

                    projectsDiv = document.createElement("div");
                    projectsDiv.className = "projects";
                    projectsDiv.innerHTML = data[x].projects;

                    trainDiv = document.createElement("div");
                    trainDiv.className = "train";
                    trainDiv.innerHTML = data[x].train;

                    rowDiv.appendChild(wagonNoDiv);
                    rowDiv.appendChild(container_1Div);
                    rowDiv.appendChild(container_2Div);
                    rowDiv.appendChild(commodityDiv);
                    rowDiv.appendChild(customerDiv);
                    rowDiv.appendChild(netDiv);
                    rowDiv.appendChild(tare_weightDiv);
                    rowDiv.appendChild(originDiv);
                    rowDiv.appendChild(destinationDiv);
                    rowDiv.appendChild(projectsDiv);
                    rowDiv.appendChild(trainDiv);



                    //document.getElementById('train_no').innerHTML = data[x].train_number;
                    //document.getElementById('understocked_value_label').innerHTML = understocked;
                    //document.getElementById('overstocked_value_label').innerHTML = overstocked;
                    // document.getElementById('adequatelystocked_value_label').innerHTML = adequatelyStocked;
                    mainWagonDiv.appendChild(rowDiv);
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

                var dropdown = document.getElementById("from_source");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_from";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_from";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdown.appendChild(newSelectOption);
                }

                var dropdown = document.getElementById("location-dropdown");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_location";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_location";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdown.appendChild(newSelectOption);
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

                var dropdown = document.getElementById("to_destination");
                dropdown.innerHTML = '';
                var newSelectOption = document.createElement("option");
                newSelectOption.id = "select_to";
                newSelectOption.value = "";
                newSelectOption.disabled = true;
                newSelectOption.selected = true;
                newSelectOption.innerHTML = "---------";
                dropdown.appendChild(newSelectOption);


                for (x in data) {
                    var newSelectOption = document.createElement("option");
                    newSelectOption.id = data[x].code + "select_to";
                    newSelectOption.value = data[x].code;
                    newSelectOption.innerHTML = data[x].code;
                    dropdown.appendChild(newSelectOption);
                }



            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }




});