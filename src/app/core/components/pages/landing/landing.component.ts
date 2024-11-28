import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    DividerModule, ButtonModule, Ripple
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(public layoutService: LayoutService, public router: Router) { }
}
