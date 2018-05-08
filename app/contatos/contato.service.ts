import { Injectable } from '@angular/core';
import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    public getContatos(): Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
    }

    public getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }
}