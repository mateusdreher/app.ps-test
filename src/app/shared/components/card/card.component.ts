import { Component, Input, OnInit } from '@angular/core';
import { SubItemCard } from 'src/app/shared/interfaces/subitem-card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  created_at: Date = new Date();
  @Input() shceduled_at: Date = new Date();
  @Input() action: SubItemCard = {
    link: '',
    text: '',
    active: false,
  };

  constructor() {

  }

  ngOnInit(): void {
  }

}
