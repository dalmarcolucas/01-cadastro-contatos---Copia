import { Injectable } from '@angular/core';
import { Http, Headers, Response, } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';


@Injectable()
export class ContatoService {
   
    constructor(
        private http : Http
    ){}

    private contatosUrl : string = 'app/contatos';
    private headers : Headers = new Headers({ 'Content-Type': 'application/json'});

    public getContatos(): Promise<Contato[]> {
       return this.http.get(this.contatosUrl)
       .toPromise()
       .then(response => response.json().data as Contato[])
       .catch(this.handleError);
    }

    public create(contato : Contato) : Promise<Contato>{
        return this.http.post(this.contatosUrl, JSON.stringify(contato), { headers: this.headers} )
        .toPromise()
        .then((response: Response) => response.json().data as Contato)
        .catch(this.handleError);
    }

    public update(contato: Contato) : Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
        .put(url, JSON.stringify(contato), { headers: this.headers} )
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    public delete(contato: Contato) : Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
        .delete(url, { headers: this.headers} )
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(error.messsage || error);
    }

    public getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }
}