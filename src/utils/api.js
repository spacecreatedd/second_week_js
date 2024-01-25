export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch('https://jurapro.bhuser.ru/api-shop/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => response.json()).then((result) => resolve(result.data.user_token)).catch((error) => {
            reject(error);
        })
    })
}
export const registerRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch('https://jurapro.bhuser.ru/api-shop/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((response) => response.json()).then((result) => { console.log(result); resolve(result.data.user_token) }).catch((error) => { reject(error) })
    })
}
export const logoutRequest = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('myAppToken');
        fetch('https://jurapro.bhuser.ru/api-shop/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            response.json();
        }).then(() => resolve())
          .catch((error) => { 
            reject(error) 
          });
    })
}