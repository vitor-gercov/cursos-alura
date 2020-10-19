class Negociacao {
    //construtor
    constructor(_data, _quantidade, _valor) {
        this._data = _data;
        this._quantidade = _quantidade;
        this._valor = _valor;
    }
    //getters
    get data() {
        return this._data;
    }
    get valor() {
        return this._valor;
    }
    get quantidade() {
        return this._quantidade;
    }
    get volume() {
        return this._quantidade * this._valor;
    }
}
