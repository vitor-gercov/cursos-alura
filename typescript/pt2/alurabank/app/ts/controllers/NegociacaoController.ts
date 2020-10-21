import{NegociacoesView, MsgView} from '../views/index'
import{Negociacoes, Negociacao} from '../models/index'
import{domInject, throttle} from '../helpers/decorators/index'
import{ NegociacaoService, HandlerFunction } from '../services/index'
import{Imprime} from '../helpers/index'

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery
    @domInject('#quantidade')
    private _inputQuantidade: JQuery
    @domInject('#valor')
    private _inputValor: JQuery
    
    private _negociacoes = new Negociacoes()
    private _negociacoesView = new NegociacoesView('#negociacoesView')
    private _msgView = new MsgView('#msgView')

    private _service = new NegociacaoService()

    constructor() {

        this._negociacoesView.update(this._negociacoes)
    }



    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace('-', ','))

        if(!this._ehDiaUtil(data)) {

            this._msgView.update('Somente negociações em dias úteis.')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )
        

        this._negociacoes.adiciona(negociacao)
        
        Imprime(negociacao, this._negociacoes)
        
        this._negociacoesView.update(this._negociacoes)
        this._msgView.update('Negociação adicionada com sucesso!')
    }

    private _ehDiaUtil(data: Date) {
        
        return data.getDay() != DiaSemana.Sábado && data.getDay() != DiaSemana.Domingo
    }

    @throttle()
    async importaDados() {

        try {
            
            const negociacoesParaImportar = await this._service
            .obterNegociacoes(res => {

                if(res.ok) {

                    return res
                }

                throw new Error(res.statusText)
            })
        
            const negociacoesJaImportadas = this._negociacoes.paraArray()

            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao))
            
            this._negociacoesView.update(this._negociacoes)
        } catch(err) {

            this._msgView.update(err.message)
        }

    }
}

enum DiaSemana {
    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sábado
}