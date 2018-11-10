/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from '../core/services/journey.service';
import { StoryService } from '../core/services/story.service';
import { FileService } from '../core/services/file.service';
import { IdService } from '../core/services/id.service';
import { Journey } from '../shared';
import { Story } from '../shared';

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

describe('Servicio Historia', () => {
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

  it('La historia deberia contener un journey de longitud mayor a 5',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { journey: 'Mi viaje'  } );
      expect(story.journey.length).toBeGreaterThan(5);
    })
  );

  it('La historia deberia contener un owner',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { owner: 'Victor'  } );
      expect(story.owner.length).toBeGreaterThan(0);
    })
  );

  it('La historia deberia contener un titulo de longitud mayor a 3',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { title: 'Mi titulo'  } );
      expect(story.title.length).toBeGreaterThan(3);
    })
  );

  it('La historia deberia contener una description',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { description: 'Mi descripcion'  } );
      expect(story.description.length).toBeGreaterThan(-1);
    })
  );


  it('La historia deberia contener un coverURL',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { coverURL: 'Direccion'  } );
      expect(story.coverURL).not.toBe('');
    })
  );

  it('La historia deberia guardar una foto',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { photos: { url: 'url', title:'title'}} );
      expect(story.photos).not.toBe({});
    })
  );

  it('La historia deberia guardar un video',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const story = new Story ( { videos: { id: 'url', type:'title'}} );
      expect(story.videos).not.toBe({});
    })
  );


});
