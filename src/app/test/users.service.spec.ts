import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from '../core/services/journey.service';
import { UserService } from '../core/services/user.service';
import { StoryService } from '../core/services/story.service';

import { FileService } from '../core/services/file.service';
import { IdService } from '../core/services/id.service';
import { Journey } from '../shared';
import { User } from '../shared';

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

describe('Servicio Usuario', () => {
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

  it('Comprobando que nombre de Usuario sea mayor a 0 en caracteres',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const user = new User({ displayName : 'Keisi Yamile' });
      expect(user.displayName.length).toBeGreaterThan(0);
    })
  );

  it('Comprobando que el url de foto de Usuario sea diferente de vacio',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const user = new User({ photoURL: 'https://scontent.flim5-4.fna.fbcdn.net/v/t1.0-9/36817627_1839414209414461_1928571707543519232_n.jpg?_nc_cat=106&_nc_ht=scontent.flim5-4.fna&oh=50239d7763cf2b23ff99923b47019f17&oe=5C7D4CE8' });
      expect(user.photoURL).not.toBe('');
    })
  );
});