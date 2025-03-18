import { TestBed } from '@angular/core/testing';

import { EstudiantesServService } from './estudiantes-serv.service';

describe('EstudiantesServService', () => {
  let service: EstudiantesServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiantesServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
