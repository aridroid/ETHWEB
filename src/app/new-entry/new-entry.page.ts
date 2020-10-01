import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      carno: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      licence: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      startdate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      enddate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File){
    let imageFile;
    if (typeof(imageData) === 'string'){
      try {
        imageFile = dataURItoBlob(imageData);
        // imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64', ''), 'image/jpeg');
      } catch (error){
        console.log(console.error);
        return;
      }
    }
    else{
      imageFile = imageData;
    }
    console.log(imageFile);
    this.form.patchValue({image: imageFile});
  }

  submitForm() {
    console.log(this.form);
  }

}
