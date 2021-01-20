export default class RestoService {

    _apiBase = 'http://localhost:3000';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error('Server error');
        }

        return await res.json();
    }

    async getMenuItems() {
        return await this.getResource('/menu/');
    }

    async postData(data) {
        const newOrder = {
            order: data,
            totalOrderPrice: data.map(item => item.totalItemPrice).reduce((sum, current) => sum + current)
        };

        

        let res = await fetch(`${this._apiBase}/orders/`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!res.ok){
            throw new Error('json error'); 
        }

        return await res.text();
    }
}