// Angular
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

// Plugins
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

// Owner
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index: number;
  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  openArticle(){
    if(this.platform.is('ios') || this.platform.is('android'))
    {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');
  }

  async onOpenMenu(){

    const normalBts: ActionSheetButton[] = [
      // {
        //   text: 'Compartir',
        //   icon: 'share-outline',
        //   handler: () => this.onShareArticle()
        // },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorito()
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'secondary'
        }
    ]

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    if(this.platform.is('capacitor')){
      normalBts.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtl.create({
      header: 'Opciones',
      buttons: normalBts
    });

    await actionSheet.present();
  }

  onShareArticle(){
    // console.log('share article')
    const {title, source, url} = this.article;
    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onToggleFavorito(){
    // console.log('togggle favorito')
    this.storageService.saveRemoveArticle(this.article);
  }
}
