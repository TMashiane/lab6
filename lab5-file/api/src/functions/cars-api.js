const { app } = require('@azure/functions');
const cars = require('./cars.json');

app.http('cars', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    route: 'cars/{id:int?}',
    handler: async (request, context) => {
        const id = request.params.id;
        const method = request.method;

        if (method === 'GET') {
            if (id) {
                const car = cars.find(car => car.id == id);
                return {
                    status: 200,
                    body: JSON.stringify(car)
                };
            }
            return {
                status: 200,
                body: JSON.stringify(cars)
            };
        }
        else if (method === 'POST') {
            const car = request.body;
            cars.push({ id: cars.length + 1, ...car });
            return {
                status: 201,
                body: JSON.stringify(car)
            };
        }
        else if (method === 'PUT') {
            const car = request.body;
            const index = cars.findIndex(car => car.id == id);
            cars[index] = car;
            return {
                status: 200,
                body: JSON.stringify(car)
            };
        }
        else if (method === 'DELETE') {
            const index = cars.findIndex(car => car.id == id);
            const car = cars[index];
            cars.splice(index, 1);
            return {
                status: 204,
                body: JSON.stringify(car)
            };
        }
    },
});