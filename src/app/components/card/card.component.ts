import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CardInterface} from "../../types/card.interface";

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input('card')
  public cardProps: CardInterface | null = null;
  public imageUrl: string | null = null;
  public imageQuestUrl: string = 'assets/images/question.svg';
  @Output()
  public cardClickEvent: EventEmitter<CardInterface> = new EventEmitter<CardInterface>();

  ngOnInit(): void {
    if (this.cardProps) this.imageUrl = 'assets/images/' + this.cardProps?.image;
  }

  public cardClickHandler(): void {
    if (this.cardProps) this.cardClickEvent.emit(this.cardProps);
  }
}
