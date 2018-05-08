import { TestBed, inject } from '@angular/core/testing';

import { AnnonceService } from './Services/annonce.service';

describe('AnnonceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnonceService]
    });
  });

  it('should be created', inject([AnnonceService], (service: AnnonceService) => {
    expect(service).toBeTruthy();
  }));
});
