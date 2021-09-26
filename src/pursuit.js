import { userAuthState } from './auth_user';

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

    getData();
}
async function getData() {
    API.graphql(graphqlOperation(listTodos)).then((evt) => {
        evt.data.listTodos.items.map((todo, i) => {
            QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
        });
    });
}

