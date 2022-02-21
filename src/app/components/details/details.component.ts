import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  // ActivatedRoute -> this dependency provides you with the API of the route onces it's activated
  // httpService -> to communicate with the API
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  // we can assign our subscription to our routeSub and we can call this activated route params subscribe so we are subscribing to our params and we are getting back the params which is a type of params
  // subscribe() is a method on the Observable type
  // The Observable type is a utility that asynchronously or synchronously streams data to a variety of components or services that have subscribed to the observable
  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }


  // we need to create getGameDetails() method in http.service.ts
  getGameDetails(id: string): void {
    this.gameSub = this.httpService
    .getGameDetails(id)
    .subscribe((gameResp: Game) => {
      this.game = gameResp;

      setTimeout(()=>{
        this.gameRating = this.game.metacritic
      }, 1000)})
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    }
    if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
      if(this.gameSub) {
        this.gameSub.unsubscribe();
      }

      if (this.routeSub) {
        this.routeSub.unsubscribe();
      }
  }
}

