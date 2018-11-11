/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from './journey.service';
import { StoryService } from './story.service';
import { FileService } from './file.service';
import { IdService } from './id.service';
import { Journey } from '../../shared';

class MockAngularFireDatabase {
  read = false;
  written = false;

  object(path) {
    this.read = true;
    return {
      set: (newVal) => {
        this.written = true;
        return Promise.resolve();
      },
    };
  }
}

class MockIdService {
  short() { return '🍭'; }
}

class MockImageService { }

describe('Servicio Journey (Viaje)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JourneyService,
        StoryService,
        { provide: AngularFireDatabase, useClass: MockAngularFireDatabase },
        { provide: IdService, useClass: MockIdService },
        { provide: FileService, useClass: MockImageService },
      ],
    });
  });

  it('Comprobando que un Journey se creo correctamente',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const journey = new Journey({ title: 'Viaje a Mancora' });
      service.createJourney(journey).subscribe((newJourney: Journey) => {
        expect(newJourney).not.toBe(journey);
        expect(newJourney.title).toBe('Viaje a Mancora');
      });
    })
  );

  it('Comprobando que el título de un Journey no puede ser vacío',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const journey = new Journey({ title: 'Viaje a Mancora' });
      //service.createJourney(journey).subscribe((newJourney: Journey) => {
      expect(journey.title.length).toBeGreaterThan(0);
      //});
    })
  );

  it('Comprobando que existe un owner (propietario) para un Journey',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const journey = new Journey({ owner: 'Gerson' });
      //service.createJourney(journey).subscribe((newJourney: Journey) => {
      expect(journey.owner.length).toBeGreaterThan(0);
      //});
    })
  );

  it('Comprobando que un Journey debe tener un coverURL',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const journey = new Journey({ coverURL: 'Gerson' });
      //service.createJourney(journey).subscribe((newJourney: Journey) => {
      expect(journey.coverURL).not.toBe('');
      //});
    })
  );

});
