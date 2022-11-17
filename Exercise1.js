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
async function getComments(){
    return await fetch('https://jsonplaceholder.typicode.com/comments')
                .then(response => response.json())
}



async function getUserNameByUserID(userId){
    let users = await getUsers()
    for(var element of users){
        // console.log(users.id+'   '+userId)
        if(element.id===userId){
            return element.name
        }
    }
}

async function getUsersWithOpenTast(){
    let tasks = await getTodos();
    let userIDS = []
    for(var element of tasks){
        if(!element.completed){
            if(!userIDS.includes(element.userId)){
                userIDS.push(element.userId)
            }
        }
    }
    let users=[]
    for(var id of userIDS){
        let name = await getUserNameByUserID(id);
        users.push(name)
    }
    return users;
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

async function getPostIdListByUserName(userName){
    let id = await getUserIdByUserName(userName);
    let postList=await getPostListByUserId(id);
    let idList=[]
    //console.log(postList)
    for(let element of postList){
        idList.push(element.id);
    }
    return idList;

}
// console.log(await getPostIdListByUserName('Clementina DuBuque'))
// console.log(await getPosts())

async function getPostsByPostIdList(postIdList){
    let posts=await getPosts()
    let result=[]
    for(let post of posts){
        if(postIdList.includes(post.id)){
            result.push(post)
        }

    }
    return result

}

async function printMostFollowedPostIdForUserByName(userName){
    let postIdList = await getPostIdListByUserName(userName)
    let comments = await getComments();
    let map=new Map()
    for(var comment of comments){

        let postId=comment.postId;
        if(!postIdList.includes(postId)){
            continue;
        }

        if(map.get(postId)){
            map.set(postId,map.get(postId)+1)

        }else{
            map.set(postId,1)
        }
    }
    
    
    let max=0;
    for(let value of map.values()){
        if(value>max){
            max=value
        }
    }

    let result=[]
    for(let key of map.keys()){
        if(map.get(key)===max){
            result.push(key)
        }
    }


    console.log('The most followed posts for '+userName+' are:')
    console.log(await getPostsByPostIdList(result))
    
}

async function printUserWithMostPosts(){
    let posts=await getPosts()
    let userIdS=new Map()
    for(let post of posts){
        if(userIdS.get(post.userId)){
            userIdS.set(post.userId,userIdS.get(post.userId)+1)
        }else{
            userIdS.set(post.userId,1)
        }
    }

    let max=0

    for(let value of userIdS.values()){
        if(value>max){
            max=value
        }
    }

    let userIdsWithMostPosts=[]

    for(let key of userIdS.keys()){
        if(userIdS.get(key)===max){
            userIdsWithMostPosts.push(key)
        }
    }

    let usersList=[]
    for(let userId of userIdsWithMostPosts){
        usersList.push(await getUserNameByUserID(userId))
    }

    console.log('Users with most posts are:')
    console.log(usersList)
}


printUserWithMostPosts()

printMostFollowedPostIdForUserByName('Clementina DuBuque')

let usersWithOpenTask=await getUsersWithOpenTast();
console.log('Users with at least 1 open task:')
console.log(usersWithOpenTask)





 


