import { Component, OnInit } from '@angular/core';
// import { AbstractService } from '../abstract.service';

import { Item } from '../item';

import { Abstract } from '../abstract';
import { ABSTRACTS } from '../abstracts'

import res from '../api/items/res.json';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.css']
})
export class AbstractComponent implements OnInit {

  abstracts: Abstract[] = [];

  constructor(/*private abstractService: AbstractService*/) { }

  //Methode zum laden der Liste von Artikeln
  getAbstracts(): void{
    //this.abstractService.getAbstract().subscribe(abstracts => this.abstracts = abstracts);
    this.abstracts = ABSTRACTS
  }

  ngOnInit(): void {
    this.getAbstracts();
  }

  sortByTitle(): void{
    this.abstracts.sort((a, b) => {
      return (a.title >= b.title) ? 1 : -1;
    })
  }

  sortByReleaseDate(): void{
    this.abstracts.sort((a, b) => {
      return (a.releaseDate >= b.releaseDate) ? 1 : -1;
    });
  }

  sortByCitations(): void{
    this.abstracts.sort((a, b) => {
      return (a.citations <= b.citations) ? 1 : -1;
    });
  }
}
