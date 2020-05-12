import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './../service/produtos.service';
import { Produto } from '../model/Produto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  produto = new Produto()

  constructor(private produtosService: ProdutosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id:number = this.route.snapshot.params["id"];
      this.findById(id)
  }

  findById(id:number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto=resp
    }, err => {
      console.log(`Erro cod: ${err.status}`)
    });
  }

  btnSim(){
    this.produtosService.delete(this.produto.id).subscribe(()=>{
      this.router.navigate(['/loja']);
  }, err => {
    console.log(err);
  });
  }

  btnNao(){
    this.router.navigate(['/loja']);
  }


}
