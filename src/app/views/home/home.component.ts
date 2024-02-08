import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router: Router = inject(Router);

  public playGame(): void {
    this.router.navigate(['/play']);
  }
}
