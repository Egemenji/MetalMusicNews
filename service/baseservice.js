import { API_URL } from "../env/config";

export const baseservice = {

    get: async (url) => {

        let result = {
            statusCode: null,
            data: null
        }
        await fetch(API_URL + url)
            .then((res) => {
                result.statusCode = res.status;
                return res.json()
            })
            .then((data) => {
                result.data = data;
            });

        return result;

    },

    post: async (url, postData) => {

        let result = {
            statusCode: null,
            data: null
        }

        let requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        await fetch(API_URL + url, requestOptions)
            .then((res) => {
                result.statusCode = res.status;
                return res.json()
            })
            .then((data) => {
                result.data = data;
            });

        return result;

    }

}