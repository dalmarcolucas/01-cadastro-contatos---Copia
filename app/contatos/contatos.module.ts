import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoDetalheComponent } from './contato-detalhe.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService} from './contato.service';

@NgModule({
    imports: [
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations: [
        ContatosListaComponent,
        ContatoDetalheComponent,
    ],
    exports: [
        ContatosListaComponent,
        ContatoDetalheComponent
    ],
    providers:[
        ContatoService
    ]
})
export class ContatosModule { }