import { Injectable } from '@angular/core';
import { PreventUnsavesChanges } from '../_guards/prevent-unsaved-changes.guard';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

// tslint:disable-next-line: typedef
success(message: string)
{
  alertify.success(message);
}

// tslint:disable-next-line: typedef
error(message: string)
{
  alertify.error(message);
}

// tslint:disable-next-line: typedef
warning(message: string)
{
  alertify.warning(message);
}

// tslint:disable-next-line: typedef
message(message: string)
{
  alertify.message(message);
}

confirm(message: string, okCallback: () => any)
{
  alertify.confirm(message, (e) => {
    if(e)
    {
      okCallback();
    }
    else
    {
      
    }
  });
}

}
