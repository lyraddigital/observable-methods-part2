import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bindCallbackProperty: string = '';
  combineLatestProperty: string = '';
  deferOneProperty: string = '';
  deferTwoProperty: string = '';
  deferThreeProperty: string = '';
  deferFourProperty: string = '';
  emptyProperty: string = '';
  fromProperty: string = '';
  fromPromiseProperty: string = '';
  fromEventProperty: string = '';
  zipWithFormatProperty: string = '';
  zipDefaultProperty: string = '';

  ngOnInit() {
    var obsOne = Observable.of(1,2,3);
    var obsTwo = Observable.of("Daryl","John","Duckmanton");
    var obsThree = Observable.of(4,5,6);
    var obsCallback = Observable.bindCallback(this.someCallbackFunction);
    var obsCombineLatest = Observable.combineLatest(obsOne, obsThree, (a, b) => a + b);
    var obsDefer = Observable.defer<any>(() => {
      if(Math.random() > 0.5) {
        return obsOne;
      }
      else {
        return obsTwo;
      }
    });

    var obsEmpty = Observable.empty();
    var obsFrom = Observable.from([1,3,4,5,6]);
    var obsFromPromise = Observable.fromPromise(Promise.resolve(1));
    var fromEventObs = Observable.fromEvent(document, 'click');
    var obsZipFormatted = Observable.zip(obsOne, obsTwo, (id: number, name: string) => ({ id, name }));
    var obsZipDefaultArray = Observable.zip(obsOne, obsTwo);

    var callbackResult = obsCallback(1);
    callbackResult.subscribe(value => { this.bindCallbackProperty = this.appendValueToProperty(this.bindCallbackProperty, value.toString()) });
    
    obsCombineLatest.subscribe(value => { this.combineLatestProperty = this.appendValueToProperty(this.combineLatestProperty, value.toString()) });
    obsDefer.subscribe(value => { this.deferOneProperty = this.appendValueToProperty(this.deferOneProperty, value.toString())});
    obsDefer.subscribe(value => { this.deferTwoProperty = this.appendValueToProperty(this.deferTwoProperty, value.toString())});
    obsDefer.subscribe(value => { this.deferThreeProperty = this.appendValueToProperty(this.deferThreeProperty, value.toString())});
    obsDefer.subscribe(value => { this.deferFourProperty = this.appendValueToProperty(this.deferFourProperty, value.toString())});
    obsEmpty.subscribe((value) => this.emptyProperty = "This will not be set.", null, ()=> { this.emptyProperty += "Only the complete method is called."; });
    obsFrom.subscribe((value) => { this.fromProperty = this.appendValueToProperty(this.fromProperty, value.toString())});
    obsFromPromise.subscribe(value => { this.fromPromiseProperty = this.appendValueToProperty(this.fromPromiseProperty, value.toString())})

    fromEventObs.subscribe(value => {
      let mouseEvent = value as MouseEvent;
      let mouseLocationText = `You are clicking at (${mouseEvent.clientX}, ${mouseEvent.clientY})`

      this.fromEventProperty = this.changeValueOfProperty(this.fromEventProperty, mouseLocationText)
    }); 

    obsZipFormatted.subscribe(value => { this.zipWithFormatProperty = this.appendValueToProperty(this.zipWithFormatProperty, JSON.stringify(value))});
    obsZipDefaultArray.subscribe(value => { this.zipDefaultProperty = this.appendValueToProperty(this.zipDefaultProperty, value.toString())});
  }

  private someCallbackFunction(aNumber: number, callback: Function) {
    console.log('Executing the function that has the callback');
    callback(aNumber);
  }

  private appendValueToProperty(property: string, value: string) : string {
    return property += `${value} `;
  }

  private changeValueOfProperty(property: string, value: string) : string {
    return property = `${value}`;
  }
}
