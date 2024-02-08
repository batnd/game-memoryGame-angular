import {Component, OnInit} from "@angular/core";
import {CardInterface} from "../../types/card.interface";
import {config} from "../../configs/config";
import {SourceCardsInterface} from "../../types/sourceCards.interface";

@Component({
  selector: 'app-board-page',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public moves: number = 0;
  public cards: CardInterface[] = [];
  public isAllCardsCompleted: boolean = false;
  public clickOneOrTwoCards: boolean = false;

  ngOnInit(): void {
    this.newGame();
  }

  private newGame(): void {
    this.moves = 0;
    let id: number = 1;
    this.cards = [...config.cards, ...config.cards]
      .sort(() => Math.random() - 0.5)
      .map((card: SourceCardsInterface): CardInterface => ({...card, id: id++, isOpened: false, isCompleted: false}));
  }

  public cardClickEvent(openedItem: CardInterface): void {
    if (openedItem.isCompleted || this.cards.filter((item: CardInterface) => item.isOpened).length >= 2) {
      return;
    }

    this.cards = this.cards.map((card: CardInterface) => {
      if (card.id === openedItem.id) card.isOpened = true;
      return card;
    });

    this.processChoosingCards();
    if (this.clickOneOrTwoCards) {
      this.moves = this.moves + 1;
    }
  }

  private processChoosingCards(): void {
    this.clickOneOrTwoCards = false;
    const openedCards: CardInterface[] = this.cards.filter((item: CardInterface) => item.isOpened);
    if (openedCards.length === 2) {
      if (openedCards[0].name === openedCards[1].name) {
        this.cards = this.cards.map((item: CardInterface) => {
          if (item.id === openedCards[0].id || item.id === openedCards[1].id) item.isCompleted = true;
          item.isOpened = false;
          return item;
        });
        this.clickOneOrTwoCards = true;
        this.checkForAllCardsCompleted();
      } else {
        this.clickOneOrTwoCards = true;
        setTimeout((): void => {
          this.cards = this.cards.map((item: CardInterface) => {
             item.isOpened = false;
             return item;
            }
          );
        }, 500);
      }
    }
  }

  private checkForAllCardsCompleted(): void {
    if (this.cards.every((item: CardInterface) => item.isCompleted)) {
      setTimeout((): void => {
        this.isAllCardsCompleted = true;
      }, 200)
    }
  }

  public restart(): void {
    this.newGame();
    this.isAllCardsCompleted = false;
  }
}

