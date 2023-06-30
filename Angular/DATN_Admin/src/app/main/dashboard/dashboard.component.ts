import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadScripts('../../../assets/plugins/jquery/dist/jquery.min.js',
     '../../../assets/plugins/bootstrap/dist/js/bootstrap.bundle.min.js',
     "../../../assets/js/app-style-switcher.js",
     "../../../assets/js/waves.js",
     "../../../assets/js/sidebarmenu.js",
     "../../../assets/js/custom.js",
     "../../../assets/plugins/flot/jquery.flot.js",
     "../../../assets/plugins/flot.tooltip/js/jquery.flot.tooltip.min.js",
     "../../../assets/js/pages/dashboards/dashboard1.js" );
  }
}

