import { Component, OnInit } from '@angular/core';
import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {

    contatos: Contato[];
    mensagem: {};
    classesCSS: {};

    constructor(private contatoService: ContatoService,
        private dialogService: DialogService) {

    }

    ngOnInit(): void {
        this.contatoService.getContatos().then((contatos: Contato[]) => {
            this.contatos = contatos;
        }).catch(err => {
            console.log(err)
            this.mostrarMensagem({tipo: 'danger', texto: 'Erro ao buscar contatos'})
        });
    }

    onDelete(contato: Contato): void {

        this.dialogService.confirm('Deseja deletar o contato' + contato.nome + '?')
            .then((deletar: boolean) => {

                if (deletar) {
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter(x => x.id != contato.id);

                            this.mostrarMensagem({ tipo: 'success', texto: 'Deletado com sucesso' });
                        })
                        .catch(error => {
                            console.log(error)
                            this.mostrarMensagem({ tipo: 'danger', texto: 'Erro ao deletar' })
                        });
                }
            });
    }

    mostrarMensagem(mensagem: { tipo: string, texto: string }): void {

        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);

        if (mensagem.tipo != 'danger')
            setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
    }

    montarClasses(tipo: string): void {

        this.classesCSS = {
            'alert': true
        };

        this.classesCSS['alert-' + tipo] = true;

    }
}