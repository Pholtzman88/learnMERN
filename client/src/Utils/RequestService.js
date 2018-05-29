export default {
    get: async function(){
        const response = await fetch('/api/comments', {method: 'get', accept: 'application/json'});
        return await response.json();
    },
    create: async function(comment){
        const response = await fetch('/api/comments', {method: 'post', body: JSON.stringify({message: comment})});
        return await response.json();
    },
    update: async function(id, newText){
        const response = await fetch('/api/comments/' + id, {method: 'PUT', body: newText});
        return await response.json()
    },
    destroy: function(id){
        return fetch("/api/comments/" + id, {method: 'delete'});
    }
};