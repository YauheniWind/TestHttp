const http = require('http');
const { on } = require('node:stream');
const url = require('url');

let cats = {
    "cat1": {
        "id": 1,
        "name": "Vasya",
        "image": "https://cdn.lifehacker.ru/wp-content/uploads/2018/12/Kak-fotografirovat-kotikov-19-sovetov-ot-professionala_1544744286-1280x640.jpg"
    },
    "cat2": {
        "id": 2,
        "name": "Lesha",
        "image": "https://klike.net/uploads/posts/2019-07/medium/1564314087_2.jpg"
    },
    "cat3": {
        "id": 3,
        "name": "Valera",
        "image": "https://klike.net/uploads/posts/2018-10/1539499416_1.jpg"
    }
}

let newCat = {
    "cat4": {
        "id": 4,
        "name": 'Gula',
        "image": 'https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg'
    }
}

let cars = {
    "car1": {
        "id": 1,
        "name": "BMW",
        "image": "https://www.bmw.sk/content/dam/bmw/common/all-models/x-series/x1/2019/navigation/BMW-X1_ModelCard.png/jcr:content/renditions/cq5dam.resized.img.585.low.time1559069834528.png"
    },
    "car2": {
        "id": 2,
        "name": "LADA",
        "image": "https://www.ladazilina.sk/wp-content/uploads/2020/06/3dv-urban.jpg"
    },
    "car3": {
        "id": 3,
        "name": "Ford",
        "image": "https://www.euromotor.sk/wp-content/uploads/2021/03/ford-puma.png"
    }
}

let newCar = {
    "car4": {
        "id": 4,
        "name": "Porsche",
        "image": "https://ipravda.sk/res/2019/09/22/thumbs/porsche-911-carrera-coupe-2020-1024-01-clanokW.jpg"
    }
}

let users = {
    "user1": {
        "id": 1,
        "name": "Gosha",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png"
    },
    "user2": {
        "id": 2,
        "name": "Lida",
        "image": "https://cdn2.iconfinder.com/data/icons/multimedia-collection-13/128/200211-03-1024.png"
    },
    "user3": {
        "id": 3,
        "name": "Feda",
        "image": "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
    }
}

let newUser = {
    "user4": {
        "id": 4,
        "name": "Dave",
        "image": "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?uuid=1ku0nhPZEeeeTwmqddPsVw"
    }
}


const parseQueryParams = (server, request) => {
    const { adress, port } = server.address()
    const parseUrl = new URL(request.url, `http://${adress}:${port}`)
    const result = {};
    for (const [key, value] of parseUrl.searchParams.entries()) {
        result[key] = value
    }
    return { result, pathName: parseUrl.pathname }
}



const server = http.createServer((request, response) => {
    console.log('server is working...');

    let rawJson = ''
    const { result, pathName } = parseQueryParams(server, request)
    if (request.method === 'GET') {
        if (pathName === '/cats') {
            console.log('Cats page')
            request
                .on('data', chank => {
                    cats += chank
                })
                .on('end', () => {
                    const requestBody = JSON.stringify(cats)
                    // console.log('requestBody', requestBody)
                    response.end(requestBody)
                })
        } else if (pathName === '/cars') {
            console.log('Cars page')
            request
                .on('data', chank => {
                    cars += chank
                })
                .on('end', () => {
                    response.end(JSON.stringify(cars))
                })
        } else if (pathName === '/users') {
            console.log('Users page')
            request
                .on('data', chank => {
                    users += chank
                })
                .on('end', () => {
                    response.end(JSON.stringify(users))
                })
        }
    } else if (request.method === 'POST') {
        if (pathName === '/cats') {
            request
                .on('data', chank => {
                    newCat += chank
                })
                .on('end', () => {
                    response.end(JSON.stringify(newCat))
                })
            response.end(JSON.stringify(newCat))
        } else if (pathName === '/cars') {
            request
                .on('data', chank => {
                    newCat += chank
                })
                .on('end', () => {
                    response.end(JSON.stringify(newCar))
                })
            response.end(JSON.stringify(newCar))
        } else if (pathName === '/users') {
            request
                .on('data', chank => {
                    newCat += chank
                })
                .on('end', () => {
                    response.end(JSON.stringify(newUser))
                })
            response.end(JSON.stringify(newUser))
        }
    } else {
        if (pathName === '/cats/1') {

            // request
            //     .on('data', chank => {
            //         cats += chank
            //     })
            //     .on('end', () => {
            //         response.end(JSON.stringify(id))
            //     })
        }
        // response.end('delete')
    }

}).listen(3000);


server.on('error', (err) => {
    console.log(err)
})