import { render, screen } from '@testing-library/angular';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BspkIcon } from './icon.component';

describe('BspkIcon', () => {
  it('should render', async () => {
    await render(BspkIcon, {
      inputs: {
        name: 'Check',
      },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/assets/bspk-icons/Check.svg').flush('<svg></svg>');

    expect(await screen.findByRole('img')).toBeInTheDocument();
  });
});
