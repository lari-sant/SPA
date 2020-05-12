import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutosService } from './../service/produtos.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class PutProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  id:number;

  constructor(private produtosService: ProdutosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params["id"];
    this.findById(this.id);
  }

  findById(id:number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto=resp
    
    }, err => {
      console.log(`Erro cod: ${err.status}`)
    });
  }

  atualizar(){
  this.produtosService.produto(this.produto).subscribe((resp: Produto)=>{
    this.produto= resp;
    this.router.navigate(['/loja'])
  })
}

}