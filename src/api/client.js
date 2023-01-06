import axios from "axios";

const $http = axios.create({
    baseURL: 'https://api.dev.pastorsline.com/api',
    headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs"
    }
})

class ApiClient {
    static getAll({page, query}) {
        return $http.get(`/contacts.json?companyId=171${query ? `&query=${query}` : ''}${page ? `&page=${page}` : ''}`);
    }

    static getUS({page, query}) {
        return $http.get(`/contacts.json?companyId=171&countryId=226${query ? `&query=${query}` : ''}${page ? `&page=${page}` : ''}`);
    }
}

export default ApiClient;