import { Component, Input } from '@angular/core';
import { ShorUrlService } from 'src/app/services/shor-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent {
  nameUrl: string = "";
  urlShort: string = "";
  isProcess: boolean = false;
  isLoading: boolean = false;
  isCopyUrlShort: boolean = false;
  isError: boolean = false;
  txtError: string = "";


  constructor(private shortUrlSrv: ShorUrlService) {

  }


  convertUrl() {
    if(this.nameUrl === "") {
      this.error("Porfavor, ingresa una URL para acortar");
      return ;
    }
    this.isLoading = true;
    this.isProcess = false;
    this.shortUrlSrv.convertToUrlShort(this.nameUrl).subscribe(data => {
      this.urlShort = data?.link;
      this.isLoading = false;
      this.isProcess = true;

    }, error => {
      this.isLoading = false;
      this.error("URL no valida para convertir");
    });
  }

  copyToClipboardUrl() {
    const inputElement = document.createElement('input');
    inputElement.value = this.urlShort;
    document.body.appendChild(inputElement);
    
    inputElement.select();

    document.execCommand('copy');
    document.body.removeChild(inputElement);

    this.isCopyUrlShort = true;

    const timeout = setTimeout(() => {
      this.isCopyUrlShort = false;
      clearTimeout(timeout)
    }, 3000);
  }

  error(message : string) {
    this.isError = true;
      this.txtError = message;
      const timeout = setTimeout(() => {
        this.isError = false;
        this.txtError = "";
        clearTimeout(timeout);
      }, 3000);
  }
}
