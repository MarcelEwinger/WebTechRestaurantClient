/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DbService } from './db.service';

describe('Service: Db', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbService]
    });
  });

  it('should ...', inject([DbService], (service: DbService) => {
    expect(service).toBeTruthy();
  }));
});
