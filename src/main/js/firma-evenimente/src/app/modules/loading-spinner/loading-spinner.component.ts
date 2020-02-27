import { LoadingService } from './loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  loading: boolean = false;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loadingStatus.subscribe(e=>{
      this.loading = e;
    })
  }

}
