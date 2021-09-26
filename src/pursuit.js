import { userAuthState } from './auth_user';
import { Predictions } from 'aws-amplify';

export function checkAuthContent() {
    // If not authenticated, pages with containing the id of 'authenticated-content' will redirect to login.html.
    if (document.querySelector("#authenticated-content")) {
        userAuthState()
            .then(data => {
                console.log('user is authenticated: ', data);
            })
            .catch(error => {
                console.log('user is not authenticated: ', error);
                // Since this is the secret page and the user is not authenticated, redirect to the login page.
                alert("This user is not authenticated and will be redirected");
                window.location = '/login.html';
            });
    } else {
        // Merely putting this here so that the authentication state of other pages can be seen in Developer Tools
        userAuthState()
            .then(data => {
                console.log('user is authenticated: ', data);
            })
            .catch(error => {
                console.log('user is not authenticated: ', error);
            });
    }
}

if (document.querySelector("#MutationEventButton")) {

    const MutationButton = document.getElementById("MutationEventButton");
    const MutationResult = document.getElementById("MutationResult");
    const QueryResult = document.getElementById("QueryResult");
    const SubscriptionResult = document.getElementById("SubscriptionResult");

    /*
    async function createNewTodo() {
        const todo = {
            name: "Use AppSync",
            description: `Realtime and Offline (${new Date().toLocaleString()})`,
        };

        return await API.graphql(graphqlOperation(createTodo, { input: todo }));
    }

    MutationButton.addEventListener("click", (evt) => {
        createNewTodo().then((evt) => {
            MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
        });
    });

    
    API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (evt) => {
            const todo = evt.value.data.onCreateTodo;
            SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
        },
    });
    */

    const UploadImageFileButton = document.getElementById("inputGroupFileAddon03");
    const LabelsResult = document.getElementById("LabelsResult");
    const file = document.getElementById("inputGroupFile03");

    UploadImageFileButton.addEventListener("click", (evt) => {
        identifyFromFile(file).then((evt) => {
            LabelsResult.innerHTML += `<p>${evt} - ${evt}</p>`;
        });
    });

    async function identifyFromFile(args) {
        console.log("identifyFromFile...");
        //const reader = new FileReader();
        const file = args.files[0];

        return Predictions.identify({
            labels: {
                source: {
                    file,
                },
                type: "LABELS" // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
            }
        }).then(
            result => {
                console.log(JSON.stringify(result, null, 2))
            })
            .catch(err => {
                //console.log(JSON.stringify(err, null, 2))
                console.log(err);
            })

        /*
    reader.addEventListener("load", async function (res) {
        // convert image file to base64 string
        //preview.src = reader.result;
        //const [file,] = files || [];
        const file = res.target.result;
        
    }, false);

    if (!filePath) {
        return;
    }
    else {
        reader.readAsArrayBuffer(filePath);
    }
    */

    }

    //getData();
}

/*
async function getData() {
    API.graphql(graphqlOperation(listTodos)).then((evt) => {
        evt.data.listTodos.items.map((todo, i) => {
            QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
        });
    });
}
*/

