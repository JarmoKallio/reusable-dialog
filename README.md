# Reusable Dialog Component and Data Transform Function

Project is generated with Angular version 17.0.0. To try out Dialog component, in `reusable-dialog` -folder run `npm install`, then `npm start` or `ng build` and `ng serve` whick will open dev server. Band data transform is run along with Dialog component tests.

## Reusable Dialog

Code for Dialog component can be found in `app/dialog` -folder. `DialogService` creates new `DialogComponent` that accepts template reference as input and renders it with ngTemplateOutlet. `DialogTemplate` -directive is used to enforce types of `close` and `submit` -template variables. They should be functions and they are used to destroy the Dialog. Both do destroy the Dialog but submit could also send an event that the caller of `DialogServices` `openDialog` could subscribe to.

## Band Data Exercise

The function implemented for Band exercise can be found in `app/data-transform` -folder. Data transform test calls the function DataTransformer.transformData -function in `data.transform.ts` to modify band data, result is then compared to expected data in the test file.

## Tests

Run `ng test` to execute the unit tests via Karma for both Dialog component and data transform function for Band data.
