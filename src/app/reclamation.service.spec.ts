import { TestBed, inject } from '@angular/core/testing';

import { ReclamationService } from './Services/reclamation.service';

describe('ReclamationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReclamationService]
    });
  });

  it('should be created', inject([ReclamationService], (service: ReclamationService) => {
    expect(service).toBeTruthy();
  }));
});
