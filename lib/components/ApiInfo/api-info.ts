'use strict';
import { Component, ChangeDetectionStrategy, OnInit, ElementRef } from '@angular/core';
import { SpecManager, BaseComponent } from '../base';
import { OptionsService, Marker } from '../../services/index';

@Component({
  selector: 'api-info',
  styleUrls: ['./api-info.css'],
  templateUrl: './api-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiInfo extends BaseComponent implements OnInit {
  info: any = {};
  specUrl: String;
  constructor(specMgr: SpecManager,
    private optionsService: OptionsService,
    elRef: ElementRef,
    marker: Marker
  ) {
    super(specMgr);
    marker.addElement(elRef.nativeElement);
  }

  init() {
    this.info = this.componentSchema.info;
    this.specUrl = this.optionsService.options.specUrl;
  }

  ngOnInit() {
    this.preinit();
  }
}
