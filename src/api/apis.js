import axios from 'axios'

let req=axios.create({
    baseURL:'http://192.168.1.106:3000',
    timeout:8000
})


export function getSeller(){
    return req.get('/api/seller')
}

export function getGoods(){
    return req.get('/api/goods')
}

export function getRatings(){
    return req.get('/api/ratings')
}