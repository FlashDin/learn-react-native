import {API_BASE_URL, ACCESS_TOKEN} from './../constants';
import {encode} from 'base-64';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    headers.append('Authorization', 'Basic ' + encode('user:password'));
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        ).catch((e) => {
            console.log(e);
        });
};

export function getCurrentUser() {
    return request({
        url: API_BASE_URL + '/user/me',
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + '/auth/login',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + '/auth/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });

}
