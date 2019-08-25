import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.renderer = this.rendererFactory.createRenderer(null,null);
  }

  enableDefault(){
    this.renderer.removeClass(this.document.body,'highContrast-theme');
    this.renderer.addClass(this.document.body,'default-theme');
  }

  enableHighContrast(){
    this.renderer.removeClass(this.document.body,'default-theme');
    this.renderer.addClass(this.document.body,'highContrast-theme');
  }
}
