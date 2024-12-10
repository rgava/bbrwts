document.addEventListener('DOMContentLoaded', function () {

    var selectedTrainNumber = 'Unattached';

    getAllTrains();
    getAllUnattachedWagons();

    const wagons_save_button = document.getElementById("save_wagons_state_btn");
    wagons_save_button.addEventListener('click', function () {

        const attachedWagonsDiv = document.getElementById('attached-wagons');
        const wagonDivs = attachedWagonsDiv.querySelectorAll('.selectable');
        const trainValue = selectedTrainNumber;

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






        const detachedWagonsDiv = document.getElementById('wagon-scrollable-content');
        const detachedwagonDivs = detachedWagonsDiv.querySelectorAll('.selectable');
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












    function getAllTrains() {
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
                    rowDiv.dataset.value = data[x].train_number

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
                        selectedTrainNumber = e.currentTarget.dataset.value;
                        getAllAttachedWagons(selectedTrainNumber);
                        //alert(e.currentTarget.dataset.value); // Use e.currentTarget to access the clicked row's dataset if you dont do this you get the last row always
                    })

                    rowDiv.appendChild(trainNoDiv);
                    rowDiv.appendChild(fromDiv);
                    rowDiv.appendChild(toDiv);
                    rowDiv.appendChild(depDateDiv);
                    rowDiv.appendChild(depTimeDiv);
                    rowDiv.appendChild(arrDateDiv);
                    rowDiv.appendChild(arrTimeDiv);


                    mainDiv.appendChild(rowDiv);
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
                    rowDiv.className = "selectable";
                    rowDiv.dataset.value = data[x].wagon_number;

                    wagonNoDiv = document.createElement("div");
                    wagonNoDiv.className = "wagon-number";
                    wagonNoDiv.innerHTML = data[x].wagon_number;

                    commodityDiv = document.createElement("div");
                    commodityDiv.className = "commodity";
                    commodityDiv.innerHTML = data[x].commodity;

                    netDiv = document.createElement("div");
                    netDiv.className = "tonnage";
                    netDiv.innerHTML = data[x].net;



                    rowDiv.appendChild(wagonNoDiv);
                    rowDiv.appendChild(commodityDiv);
                    rowDiv.appendChild(netDiv);


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


                mainWagonDiv = document.getElementById("attached-wagons");
                mainWagonDiv.innerHTML = '';

                for (x in data) {

                    rowDiv = document.createElement("div");
                    rowDiv.className = "selectable";
                    rowDiv.dataset.value = data[x].wagon_number;

                    wagonNoDiv = document.createElement("div");
                    wagonNoDiv.className = "wagon-number";
                    wagonNoDiv.innerHTML = data[x].wagon_number;

                    commodityDiv = document.createElement("div");
                    commodityDiv.className = "commodity";
                    commodityDiv.innerHTML = data[x].commodity;

                    netDiv = document.createElement("div");
                    netDiv.className = "tonnage";
                    netDiv.innerHTML = data[x].net;



                    rowDiv.appendChild(wagonNoDiv);
                    rowDiv.appendChild(commodityDiv);
                    rowDiv.appendChild(netDiv);


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
});