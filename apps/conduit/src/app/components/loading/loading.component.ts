import { Component, OnInit } from '@angular/core';
import {
  style,
  transition,
  animate,
  state,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'rpp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('spin', [
      state(
        'spin180',
        style({
          transform: 'rotate(180)',
        })
      ),
      state(
        'spin0',
        style({
          transform: 'rotate(0)',
        })
      ),
      transition('spin0 => spin180', [animate(1)]),
      transition('spin0 => spin180', [animate(1)]),
    ]),
  ],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
