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

describe('Servicio Usuarios', () => {
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

});
