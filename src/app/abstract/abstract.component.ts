import { Component, OnInit } from '@angular/core';
import { AbstractService } from '../abstract.service';

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

  // abstracts: Object[] = [];
  abstracts: Item[] = [];
  allAbstracts: Item[] = [];
  public Searchl: string = "Hello";

  constructor(private abstractService: AbstractService) { }

  ngOnInit(): void {
    this.getAbstracts();
  }

  //Methode zum laden der Liste von Artikeln
  getAbstracts(): void{
    this.abstractService.getAbstracts().then(data => {
      let loader = document.getElementById('loader');
      if(loader != null)
        loader.remove();
      this.abstracts = data;
      this.allAbstracts = data;
    });
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

  search(event: Event): void{
    let target = <HTMLInputElement>event.target;

    if(target != null)
      this.Searchl = target.value.toLowerCase();

    this.abstracts = this.allAbstracts.filter(abstract => {
      let bool1 = abstract.title.toLowerCase().includes(this.Searchl);
      let bool2 = abstract.authors.toLowerCase().includes(this.Searchl);

      return bool1 || bool2;
    });

    if(this.Searchl == '')
      this.abstracts = this.allAbstracts;
  }
}
