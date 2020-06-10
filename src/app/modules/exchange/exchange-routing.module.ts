import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ExchangeContainerComponent} from "./containers/exchange-container/exchange-container.component";

const routes: Routes = [
  {
    path: '',
    component: ExchangeContainerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {}
