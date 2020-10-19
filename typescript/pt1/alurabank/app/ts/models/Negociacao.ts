class Negociacao {
    
    //construtor
    constructor(private _data: Date, 
                private _quantidade: number, 
                private _valor: number) {}


    //getters
    get data() {
        return this._data
    }
    get valor() {
        return this._valor
    }
    get quantidade() {
        return this._quantidade
    }
    get volume() {
        return this._quantidade * this._valor
    }
}