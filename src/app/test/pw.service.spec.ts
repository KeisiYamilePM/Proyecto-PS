/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from '../core/services/journey.service';
import { StoryService } from '../core/services/story.service';
import { CommentService } from '../core/services/comment.service';
import { PwService } from '../core/services/pw.service';
import { FileService } from '../core/services/file.service';
import { IdService } from '../core/services/id.service';
import { Journey } from '../shared';
import { Story } from '../shared';
import { Comment } from '../shared';
import { Pw } from '../shared';

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

describe('Servicio Web Física', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JourneyService,
        StoryService,
        CommentService,
        PwService,
        { provide: AngularFireDatabase, useClass: MockAngularFireDatabase },
        { provide: IdService, useClass: MockIdService },
        { provide: FileService, useClass: MockImageService },
      ],
    });
  });

  it('La web física deberia contener un título  de longitud mayor a 0',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { title: 'SMART SPORTSWEAR'  } );
      expect(pw.title.length).toBeGreaterThan(0);
    })
  );

  it('La web física deberia tener un url  de longitud mayor a 2',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { url: 'http://vzturl.com/apa83'  } );
      expect(pw.url.length).toBeGreaterThan(-2);
    })
  );

    it('La web física deberia tener un url mas corto  de longitud mayor a -1',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { shortUrl: 'vzturl.com' } );
      expect(pw.shortUrl.length).toBeGreaterThan(-1);
    })
  );

  it('El tamaño descripción de la web física debe ser mayor a -1',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { description: 'Esta web física....'  } );
      expect(pw.description.length).toBeGreaterThan(-1);
    })
  );



    it('La fecha de la creación de la web física no debe ser nula',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { createdAt: 45  } );
      expect(pw.createdAt).not.toBe(null);
    })
  );


 it('La fecha de la creación de la web física debe ser del tipo número',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { createdAt: 11/11/2018  } );
      expect(typeof(pw.createdAt)).toEqual('number');
    })
  );

 it('La web fisica deberia poder guardar un beacon',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const pw = new Pw ( { beacon: { id: '123', name:'beacon123'}} );
      expect(pw.beacon).not.toBe(null);
    })
  );




});
