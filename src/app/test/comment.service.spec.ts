/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from '../core/services/journey.service';
import { StoryService } from '../core/services/story.service';
import { CommentService } from '../core/services/comment.service';
import { FileService } from '../core/services/file.service';
import { IdService } from '../core/services/id.service';
import { Journey } from '../shared';
import { Story } from '../shared';
import { Comment } from '../shared';

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

describe('Servicio comentario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JourneyService,
        StoryService,
        CommentService,
        { provide: AngularFireDatabase, useClass: MockAngularFireDatabase },
        { provide: IdService, useClass: MockIdService },
        { provide: FileService, useClass: MockImageService },
      ],
    });
  });

  it('El comentario deberia contener un Story de longitud mayor a 0',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const comment = new Comment ( { story: 'Paseo en Arequipa'  } );
      expect(comment.story.length).toBeGreaterThan(0);
    })
  );

  it('El comentario deberia contener un owner',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const comment = new Comment ( { owner: 'Daleshka'  } );
      expect(comment.owner.length).toBeGreaterThan(0);
    })
  );

    it('El comentario deberia contener una longitud mayor a 0',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const comment = new Comment ( { description: 'Linda foto' } );
      expect(comment.description.length).toBeGreaterThan(0);
    })
  );

  it('El comentario deberia contener una longitud de 400 caracteres',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      
      const comment = new Comment ( { description: 'Como se dice en un post, mi viaje con mi línea aérea panameña Copa Airlines, saliendo por el Aeropuerto Internacional La Chinita en Maracaibo, para tener en cuenta las tarifas muy bajas, y para justificar el viaje por tierra en Caracas, aprovechando para Visitar mi mamá en la ciudad de Barquisimeto, pasar una noche en su casa y seguir al día siguiente a Maracaibo :)'  } );
      expect(comment.description.length).toBeGreaterThan(300);
    })
  );
});
