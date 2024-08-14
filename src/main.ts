import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {  provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { gameReducer } from './app/state/reducers/game.reducers';
import { configureReducer } from './app/state/reducers/configure.reducer';


bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      game: gameReducer,
      config: configureReducer,
    }
    // ,{ metaReducers: [localStorageSyncReducer] } 
  ),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }))
  ],
});