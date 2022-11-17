import fetch from "node-fetch"


async function getUsers(){
    return await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())

}

async function getTodos(){
    return await fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => response.json())

}

async function getPosts(){
    return await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
}

async function getUserIdByUserName(userName){
    let users = await getUsers()
    for(var element of users){
        if(element.name===userName||element.username===userName){
            return element.id;
        }
    }
}

async function getPostListByUserId(userID){
    let posts = await getPosts()
    let result=[]
    for(var element of posts){
        if(element.userId===userID){
            result.push(element)
        }
    }
    return result;
}

async function getTodoListByUserId(userID){
    let todos = await getTodos()
    let result = []
    for(var element of todos){
        if(element.userId===userID){
            result.push(element)
        }
    }
    return result;
}

async function getPostsAndTodosByName(userName){
    let id = await getUserIdByUserName(userName)
    let result = {}
    result.posts=await getPostListByUserId(id)
    result.todos=await getTodoListByUserId(id)
    return result;

}

console.log(await getPostsAndTodosByName('Clementina DuBuque'))
// console.log(await getTodoListByUserId(10))
